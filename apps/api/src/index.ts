import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

// Middleware'ler
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"], // Vite dev server adresi
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check route
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = 4000;
console.log(`Backend server running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

