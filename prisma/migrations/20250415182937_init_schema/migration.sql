-- User table (if it doesn't exist already)
CREATE TABLE IF NOT EXISTS "User" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "fitnessGoal" TEXT,
    "dietaryPreferences" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "physicalStats" JSONB,
    "preferences" JSONB,
    "_v" INTEGER NOT NULL DEFAULT 0
);

-- Create UserNotes table
CREATE TABLE IF NOT EXISTS "UserNotes" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "userId" UUID NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "value" TEXT NOT NULL,
    "confidence" FLOAT NOT NULL DEFAULT 0.5,
    "source" VARCHAR(50) NOT NULL DEFAULT 'inferred',
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "userNotes_userId_key_unique" UNIQUE ("userId", "key")
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS "idx_userNotes_userId_category" ON "UserNotes"("userId", "category");

-- Add foreign key constraint
ALTER TABLE "UserNotes" ADD CONSTRAINT "fk_userNotes_user" 
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;

-- Conversation table (if it doesn't exist already)
CREATE TABLE IF NOT EXISTS "Conversation" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "conversation" JSONB,
    "userId" UUID NOT NULL
);

-- Add foreign key for Conversation
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;