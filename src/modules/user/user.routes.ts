import { Router } from "express";
import { isAuthenticated } from "@/middlewares/auth0.ts";
import { getMe } from "./user.controllers.ts";

const router = Router();

router.get("/me", isAuthenticated, getMe);

export const userRouter = router;