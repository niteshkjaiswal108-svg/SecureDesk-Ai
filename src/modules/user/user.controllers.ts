// src/modules/user/user.controllers.ts
import type { Request, Response } from "express";
import logger from "@/utils/logger.ts";
import { getOrCreateUserByAuth0Id } from "./user.repositories.ts";

export async function getMe(req: Request, res: Response) {
  const auth = (req as any).auth;

  if (!auth?.payload) {
    logger.warn("Unauthorized access to /users/me from IP %s", req.ip);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const payload = auth.payload as any;
  const sub = payload.sub as string | undefined;

  if (!sub) {
    logger.error("Auth0 token missing sub claim");
    return res.status(400).json({ error: "Invalid token: missing sub" });
  }

  const email = payload.email as string | undefined;
  const name = payload.name as string | undefined;

  try {
    const user = await getOrCreateUserByAuth0Id({
      auth0Id: sub,
      email: email ?? null,
      name: name ?? null,
    });

    logger.info("User profile loaded", { auth0Id: sub, email: user?.email });

    return res.json({
      id: user?.id,
      auth0Id: user?.auth0_id,
      email: user?.email,
      name: user?.name,
      preferences: user?.preferences,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
    });
  } catch (err) {
    logger.error("Failed to load user profile", {
      error: (err as Error).message,
      auth0Id: sub,
    });
    return res.status(500).json({ error: "Internal server error" });
  }
}