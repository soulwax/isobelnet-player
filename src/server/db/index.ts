// File: src/server/db/index.ts

import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { readFileSync } from "fs";
import path from "path";
import * as schema from "./schema";

// Configure Neon to use standard PostgreSQL compatible mode
neonConfig.fetchConnectionCache = true;

const connectionString = process.env.DATABASE_URL!;

// Create Neon pool with SSL configuration
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync(path.join(process.cwd(), "certs/ca.pem")).toString(),
  },
  // Connection pool configuration to prevent exhaustion
  max: 5, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Connection timeout
});

// Graceful shutdown - close pool when process exits
if (typeof process !== 'undefined') {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing database pool...');
    void pool.end();
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, closing database pool...');
    void pool.end();
  });
}

export const db = drizzle(pool, { schema });
export { pool }; // Export pool for monitoring
