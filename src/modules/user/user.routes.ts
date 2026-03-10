import { Router } from "express";
import { requireAuth } from "@/middlewares/auth0.ts";
import { getMe } from "./user.controllers.ts";

const router = Router();

router.get("/me", requireAuth, getMe);

export const userRouter = router;