import type { Request, Response } from "express";
import { createIntegration, deleteIntegration, getIntegrations } from "./integrations.repositories.ts";
import * as googleServices from "./google/google.services.ts";
import * as linkedinServices from "./linkedin/linkedin.services.ts";

export const generateAuthUrl = async(provider: string) => {
    switch (provider) {
        case "google":
            return googleServices.generateGoogleAuthUrl();
        case "linkedin":
            return linkedinServices.generateLinkedinAuthUrl();
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}

export const exchangeCodeForTokens = async (code: string, userId: number, provider: string) => {
    switch (provider) {
        case "google":
            return googleServices.exchangeGoogleCodeForTokens(code, userId);
        case "linkedin":
            return linkedinServices.exchangeLinkedinCodeForTokens(code, userId);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}

export const getSupportedIntegrations = async () => {
    return ["google", "linkedin"];
}

export const revokeIntegration = async (provider: string, userId: number) => {
    await deleteIntegration({
        userId: userId,
        provider: provider,
    })
    return { message: "Integration revoked!"};
}

export const getConnectedIntegrations = async (userId: number) => {
    const integrations = await getIntegrations({
        userId: userId,
    })
    return integrations;
}