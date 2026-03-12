import { db } from "@/db/db.ts";
import { integrations } from "@/db/schema.ts";

export async function createIntegration(input: {
    userId: number,
    provider: string,
    accessToken: string,
    refreshToken: string,
}) {
    const { userId, provider, accessToken, refreshToken } = input;
    const inserted = await db
        .insert(integrations)
        .values({
            user_id: userId,
            provider,
            access_token: accessToken,
            refresh_token: refreshToken,
        })
        .returning();
    return inserted[0];
}