import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL environment variable tanımlanmamış.");
}

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });
export * from "./schema/index.js";

