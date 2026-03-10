import logger from "@/utils/logger.ts";
import type { Request, Response } from "express";
import { getOrCreateUserByAuth0Id } from "../user/user.repositories.ts";

export const getCurrentUser = (req: Request, res: Response) => {
  const auth = (req as any).auth;

  if (!auth?.payload) {
    logger.warn("Unauthorized access attempt to getCurrentUser from IP: %s", req.ip);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { sub, email, name, ...rest } = auth.payload as any;

  logger.info("User retrieved successfully", { userId: sub, email });

  return res.json({
    id: sub,
    email,
    name,
    claims: rest,
  });
};

function hasMfa(authPayload: any) {
  // Common Auth0 patterns:
  // - amr includes "mfa" after MFA
  // - acr indicates a higher assurance level (tenant-specific)
  const amr: unknown = authPayload?.amr;
  const acr: unknown = authPayload?.acr;

  const amrHasMfa =
    Array.isArray(amr) && amr.some((v) => typeof v === "string" && v.toLowerCase() === "mfa");

  // If you use acr-based step-up, set your expected value (example: "urn:mace:incommon:iap:silver")
  const expectedAcr = process.env.AUTH0_MFA_ACR;
  const acrSatisfied = expectedAcr ? acr === expectedAcr : false;

  return amrHasMfa || acrSatisfied;
}

export const verifyMfa = (req: Request, res: Response) => {
  const auth = (req as any).auth;

  if (!auth?.payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const ok = hasMfa(auth.payload);
  const sub = (auth.payload as any)?.sub;

  if (!ok) {
    logger.warn("MFA not present on token", { userId: sub });
    return res.status(403).json({
      error: "mfa_required",
      message: "Multi-factor authentication required for this action.",
    });
  }

  logger.info("MFA verified", { userId: sub });
  return res.json({ verified: true });
};