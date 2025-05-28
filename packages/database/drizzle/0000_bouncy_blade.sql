CREATE TABLE "dictionary_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"icon" text,
	"name" text NOT NULL,
	CONSTRAINT "dictionary_categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "definitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wordId" uuid NOT NULL,
	"partOfSpeech" text,
	"meaning" text,
	"example" text
);
--> statement-breakpoint
CREATE TABLE "dictionaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"coverIcon" text,
	"coverImage" text,
	"description" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dictionary_category_relations" (
	"dictionaryId" uuid,
	"categoryCode" text,
	CONSTRAINT "dictionary_category_relations_dictionaryId_categoryCode_pk" PRIMARY KEY("dictionaryId","categoryCode")
);
--> statement-breakpoint
CREATE TABLE "user_dictionaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"dictionaryId" uuid NOT NULL,
	"selectedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dictionaryId" uuid NOT NULL,
	"word" text NOT NULL,
	"pronunciation" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" bigint,
	"id_token" text,
	"scope" text,
	"session_state" text,
	"token_type" text
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL,
	"sessionToken" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"identifier" text NOT NULL,
	"expires" timestamp NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "definitions" ADD CONSTRAINT "definitions_wordId_words_id_fk" FOREIGN KEY ("wordId") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dictionary_category_relations" ADD CONSTRAINT "dictionary_category_relations_dictionaryId_dictionaries_id_fk" FOREIGN KEY ("dictionaryId") REFERENCES "public"."dictionaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dictionary_category_relations" ADD CONSTRAINT "dictionary_category_relations_categoryCode_dictionary_categories_code_fk" FOREIGN KEY ("categoryCode") REFERENCES "public"."dictionary_categories"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dictionaries" ADD CONSTRAINT "user_dictionaries_dictionaryId_dictionaries_id_fk" FOREIGN KEY ("dictionaryId") REFERENCES "public"."dictionaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "words" ADD CONSTRAINT "words_dictionaryId_dictionaries_id_fk" FOREIGN KEY ("dictionaryId") REFERENCES "public"."dictionaries"("id") ON DELETE cascade ON UPDATE no action;