// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { requireAuth } from "../../middlewares/auth0.js";
import { getCurrentUser, verifyMfa } from "./auth.controllers.ts";

const router = Router();

router.get("/me", requireAuth, getCurrentUser);
router.post("/verify-mfa", requireAuth, verifyMfa);

export const authRouter = router;