CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth0_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"preferences" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_auth0_id_unique" UNIQUE("auth0_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
