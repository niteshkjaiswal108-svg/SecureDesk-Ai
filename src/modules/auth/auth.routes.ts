// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { isAuthenticated } from "@/middlewares/auth0.ts";
import { getCurrentUser, verifyMfa } from "./auth.controllers.ts";

const router = Router();

router.get("/me", isAuthenticated, getCurrentUser);
router.post("/verify-mfa", isAuthenticated, verifyMfa);

export const authRouter = router;