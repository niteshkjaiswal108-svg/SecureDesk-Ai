import type { Request, Response } from "express";
import * as googleServices from "./integrations.services.ts"
import logger from "@/utils/logger.ts";

export const connectIntegration = async (req: Request, res: Response) => {
    const { provider } = req.params;
    if (!provider) return res.status(400).json({ error: "Missing provider parameter" });
    if (typeof provider !== "string") return res.status(400).json({ error: "Provider must be a string" });
    const url = await googleServices.generateAuthUrl(provider);
    return res.redirect(url);
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        if (!code) return res.status(400).json({ error: "Missing code parameter" });
        const tokens = await googleServices.exchangeGoogleCodeForTokens(code);
        
        return res.json({ message: "Google account connected!", tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        } });
    } catch (error) {
        res.status(500).json({ error: "Failed to connect Google account" });
        logger.error("Failed to connect Google account", { error: (error as Error).message });
    }
}