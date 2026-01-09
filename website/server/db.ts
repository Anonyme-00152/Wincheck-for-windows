import { eq, gte, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  systemMetrics,
  scanResults,
  optimizationReports,
  hardwareInfo,
  alertConfigs,
  alertHistory,
  InsertScanResult,
  InsertHardwareInfo,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getSystemMetricsHistory(userId: number, hours: number = 24) {
  const db = await getDb();
  if (!db) return [];

  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return db
    .select()
    .from(systemMetrics)
    .where(and(eq(systemMetrics.userId, userId), gte(systemMetrics.createdAt, since)))
    .orderBy(systemMetrics.createdAt);
}

export async function getLatestSystemMetrics(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(systemMetrics)
    .where(eq(systemMetrics.userId, userId))
    .orderBy(desc(systemMetrics.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createScanResult(data: InsertScanResult) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(scanResults).values(data);
  return result;
}

export async function getScanResults(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(scanResults)
    .where(eq(scanResults.userId, userId))
    .orderBy(desc(scanResults.createdAt))
    .limit(limit);
}

export async function getOptimizationReports(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(optimizationReports)
    .where(eq(optimizationReports.userId, userId))
    .orderBy(desc(optimizationReports.createdAt))
    .limit(limit);
}

export async function getHardwareInfo(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(hardwareInfo)
    .where(eq(hardwareInfo.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function upsertHardwareInfo(data: InsertHardwareInfo) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getHardwareInfo(data.userId!);
  if (existing) {
    return db.update(hardwareInfo).set(data).where(eq(hardwareInfo.userId, data.userId!));
  }
  return db.insert(hardwareInfo).values(data);
}

export async function getAlertConfigs(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(alertConfigs)
    .where(eq(alertConfigs.userId, userId));
}

export async function getAlertHistory(userId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(alertHistory)
    .where(eq(alertHistory.userId, userId))
    .orderBy(desc(alertHistory.createdAt))
    .limit(limit);
}
