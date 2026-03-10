// src/modules/user/user.repositories.ts
import { eq } from "drizzle-orm";
import { db } from "@/db/db.ts";
import { users } from "@/db/schema.ts";

export async function getOrCreateUserByAuth0Id(input: {
  auth0Id: string;
  name?: string | null;
  email?: string | null;
}) {
  const { auth0Id, name, email } = input;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.auth0_id, auth0Id))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const inserted = await db
    .insert(users)
    .values({
      auth0_id: auth0Id,
      name: name ?? null,
      email: email ?? null,
    })
    .returning();

  return inserted[0];
}