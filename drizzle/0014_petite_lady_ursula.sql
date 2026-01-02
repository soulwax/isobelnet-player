-- File: drizzle/0014_petite_lady_ursula.sql

ALTER TABLE "hexmusic-stream_user_preferences" ADD COLUMN "queueState" jsonb DEFAULT NULL;
