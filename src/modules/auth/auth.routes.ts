// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { requireAuth } from "../../middlewares/auth0.js";
import { getCurrentUser } from "./auth.controllers.ts";

const router = Router();

router.get("/me", requireAuth, getCurrentUser);

export const authRouter = router;