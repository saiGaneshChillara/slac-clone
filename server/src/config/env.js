import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  STREAM_KEY: process.env.STREAM_KEY,
  STREAM_SECRET: process.env.STREAM_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
  INNGEST_EVENT_KEY: process.env.INGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INGEST_SIGNIN_KEY,
};