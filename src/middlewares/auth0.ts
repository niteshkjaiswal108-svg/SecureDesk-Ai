import { auth } from "express-oauth2-jwt-bearer";

const audience = process.env.AUTH0_AUDIENCE;
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;

if (!audience || !issuerBaseURL) {
    throw new Error(
        "Missing Auth0 env: set AUTH0_AUDIENCE and AUTH0_ISSUER_BASE_URL in your .env file (see .env.example)."
    );
}

export const isAuthenticated = auth({
    audience,
    issuerBaseURL,
    tokenSigningAlg: "RS256",
});