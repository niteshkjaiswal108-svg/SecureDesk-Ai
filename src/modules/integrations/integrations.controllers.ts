import type { Request, Response } from "express";
import * as integrationServices from "./integrations.services.ts"
import logger from "@/utils/logger.ts";

export const connectIntegration = async (req: Request, res: Response) => {
    const { provider } = req.params;
    if (!provider) return res.status(400).json({ error: "Missing provider parameter" });
    if (typeof provider !== "string") return res.status(400).json({ error: "Provider must be a string" });
    const url = await integrationServices.generateAuthUrl(provider);
    return res.redirect(url);
}

export const integrationCallback = async (req: Request, res: Response) => {
    try {
        const auth = (req as any).auth;
        const userId = auth.payload.sub;
        const code = req.query.code as string;
        if (!code) return res.status(400).json({ error: "Missing code parameter" });
        const provider = req.params.provider;
        if (!provider) return res.status(400).json({ error: "Missing provider parameter" });
        if (typeof provider !== "string") return res.status(400).json({ error: "Provider must be a string" });
        const connected = await integrationServices.exchangeCodeForTokens(code, userId, provider);
        return res.json({ connected })
    } catch (error) {
        res.status(500).json({ error: "Failed to connect integration" });
        logger.error("Failed to connect integration", { error: (error as Error).message });
    }
}

export const getSupportedIntegrations = async (req: Request, res: Response) => {
    const providers = await integrationServices.getSupportedIntegrations();
    return res.json({ providers });
}

export const revokeIntegration = async (req: Request, res: Response) => {
    const { provider } = req.params;
    if (!provider) return res.status(400).json({ error: "Missing provider parameter" });
    if (typeof provider !== "string") return res.status(400).json({ error: "Provider must be a string" });
    const auth = (req as any).auth;
    const userId = auth.payload.sub;
    const revoked = await integrationServices.revokeIntegration(provider, userId);
    return res.json({ revoked });
}

export const getConnectedIntegrations = async (req: Request, res: Response) => {
    const auth = (req as any).auth;
    const userId = auth.payload.sub;
    const integrations = await integrationServices.getConnectedIntegrations(userId);
    return res.json({ integrations });
}