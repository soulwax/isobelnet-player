// File: src/app/api/health/route.ts

import { pool } from "@/server/db";
import { NextResponse } from "next/server";

/**
 * Health check endpoint for PM2 and monitoring tools
 * Returns 200 if healthy, 503 if unhealthy
 */
export async function GET() {
  const startTime = Date.now();
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
    },
    checks: {
      database: "unknown" as "ok" | "error" | "unknown",
    },
  };

  try {
    // Quick database check - just verify we can query
    await pool.query("SELECT 1");
    health.checks.database = "ok";
  } catch (error) {
    health.checks.database = "error";
    health.status = "error";
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json(
      {
        ...health,
        error: error instanceof Error ? error.message : "Unknown database error",
        responseTime,
      },
      { status: 503 }
    );
  }

  const responseTime = Date.now() - startTime;
  return NextResponse.json({
    ...health,
    responseTime,
  });
}

