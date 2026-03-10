import logger from "@/utils/logger.ts";
import type { Request, Response } from "express";

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