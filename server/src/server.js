import express from 'express';

import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { functions, inngest } from './config/inngest.js';

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/", (req, res) => {
  res.send("Hello world this");
});

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