import { db } from "@/db/db.ts";
import { integrations } from "@/db/schema.ts";
import { and, eq } from "drizzle-orm";

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

export async function deleteIntegration(input: {
    userId: number,
    provider: string,
}) {
    const { userId, provider } = input;
    const deleted = await db
        .delete(integrations)
        .where(and(eq(integrations.user_id, userId), eq(integrations.provider, provider)))
        .returning();
    return deleted[0];
}