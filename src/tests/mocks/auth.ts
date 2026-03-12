import { isAuthenticated } from "@/middlewares/auth0.ts";
import type { NextFunction } from "express"

export const mockAuthMiddleware = (req: any, res: any, next: any) => {
    req.auth  = {
        payload: {
            sub: "auth0|123",
            email: "test@gmail.com",
            name: "Test User"
        }
    };
    next();
}