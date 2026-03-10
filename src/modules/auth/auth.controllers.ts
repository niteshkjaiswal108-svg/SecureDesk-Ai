import type { Request, Response } from "express";

export const getCurrentUser = (req: Request, res: Response) => {
  const auth = (req as any).auth; 

  if (!auth?.payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const { sub, email, name, ...rest } = auth.payload as any;

  return res.json({
    id: sub,
    email,
    name,
    claims: rest,
  });
};