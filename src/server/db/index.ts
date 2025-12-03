// File: src/server/db/index.ts

import { drizzle } from "drizzle-orm/node-postgres";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { Pool } from "pg";
import * as schema from "./schema";

// Determine certificate path based on environment
function getCertPath(): string {
  // Try multiple possible locations
  const possiblePaths = [
    path.join(process.cwd(), "certs/ca.pem"), // Development
    path.join(__dirname, "../../certs/ca.pem"), // Relative to build output
    path.join(__dirname, "../../../certs/ca.pem"), // Another build variant
  ];

  for (const certPath of possiblePaths) {
    if (existsSync(certPath)) {
      console.log(`[DB] Using certificate from: ${certPath}`);
      return certPath;
    }
  }

  throw new Error(
    `[DB] Certificate not found. Searched paths: ${possiblePaths.join(", ")}`,
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync(getCertPath()).toString(),
  },
  // Connection pool configuration to prevent exhaustion
  // With 2 frontend instances, total max connections = 2 × 5 = 10
  max: 5, // Maximum number of clients per instance
  min: 1, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
});

// Graceful shutdown - close pool when process exits
if (typeof process !== "undefined") {
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing database pool...");
    void pool.end();
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, closing database pool...");
    void pool.end();
  });
}

export const db = drizzle(pool, { schema });
export { pool }; // Export pool for monitoring
