import type { Request, Response } from "express";
import { createIntegration, deleteIntegration, getIntegrations } from "./integrations.repositories.ts";
import * as googleServices from "./google/google.services.ts";

export const generateAuthUrl = async(provider: string) => {
    switch (provider) {
        case "google":
            return googleServices.generateGoogleAuthUrl();
        case "linkedin":
            return generateLinkedinAuthUrl();
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}

export const generateLinkedinAuthUrl = async () => {
    const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
    url.searchParams.set("client_id", process.env.LINKEDIN_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.LINKEDIN_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "r_emailaddress r_liteprofile");
    url.searchParams.set("state", "random_state_string");

    return url.toString();
}

export const exchangeCodeForTokens = async (code: string, userId: number, provider: string) => {
    switch (provider) {
        case "google":
            return googleServices.exchangeGoogleCodeForTokens(code, userId);
        case "linkedin":
            return exchangeLinkedinCodeForTokens(code, userId);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}


export const exchangeLinkedinCodeForTokens = async (code: string, userId: number) => {
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.LINKEDIN_CLIENT_ID!,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
            redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
            grant_type: "authorization_code"
        })
    });

    if (!tokenResponse.ok) {
        throw new Error(`Linkedin token exchange failed: ${tokenResponse.statusText}`)
    }

    const tokens = await tokenResponse.json();

    await createIntegration({
        userId: userId,
        provider: "linkedin",
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
    })
    
    return { message: "Linkedin account connected!"};
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