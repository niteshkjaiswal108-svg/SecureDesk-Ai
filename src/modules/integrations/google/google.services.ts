import { createIntegration } from "../integrations.repositories.ts";

export const generateGoogleAuthUrl = async () => {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly");
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "consent");

    return url.toString();
}

export const exchangeGoogleCodeForTokens = async (code: string, userId: number) => {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            grant_type: "authorization_code"
        })
    });

    if (!tokenResponse.ok) {
        throw new Error(`Google  token exchange failed: ${tokenResponse.statusText}`)
    }

    const tokens = await tokenResponse.json();

    await createIntegration({
        userId: userId,
        provider: "google",
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
    })
    
    return { message: "Google account connected!"};
}

