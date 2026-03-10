import express from "express";
import { authRouter } from "@/modules/auth/auth.routes.ts";
import { userRouter } from "@/modules/user/user.routes.ts";

export const app = express();

app.get("/", (req, res) => {
    res.send("Hello from securedeskai");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);