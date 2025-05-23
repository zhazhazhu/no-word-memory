CREATE TABLE "users_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"avatar" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP
);
