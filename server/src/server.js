import "../instrument.mjs";

import { clerkMiddleware } from '@clerk/express';
import express from 'express';
import { serve } from 'inngest/express';

import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { functions, inngest } from './config/inngest.js';
import chatRoutes from './routes/chat.route.js';

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Hello world this");
});
app.get("/debug-sentry", (req, res) => {
  throw new Error("This is error");
});

app.use("/api/inngest", serve({ client: inngest, functions, signingKey: ENV.INNGEST_SIGNING_KEY }));
app.use("/api/chat", chatRoutes);


Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV != 'production') {
      app.listen(ENV.PORT, () => {
        console.log(`Server started on ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();

export default app;