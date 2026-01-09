import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// System metrics table for storing historical data
export const systemMetrics = mysqlTable('system_metrics', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  cpuUsage: int('cpuUsage').notNull(), // percentage 0-100
  ramUsage: int('ramUsage').notNull(), // percentage 0-100
  ramTotal: int('ramTotal').notNull(), // in MB
  diskUsage: int('diskUsage').notNull(), // percentage 0-100
  diskFree: int('diskFree').notNull(), // in MB
  networkDown: int('networkDown').notNull(), // in Kbps
  networkUp: int('networkUp').notNull(), // in Kbps
  temperature: int('temperature'), // in Celsius, nullable
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type SystemMetric = typeof systemMetrics.$inferSelect;
export type InsertSystemMetric = typeof systemMetrics.$inferInsert;

// Scan results table
export const scanResults = mysqlTable('scan_results', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  scanType: varchar('scanType', { length: 50 }).notNull(), // 'disk', 'registry', 'startup', 'services'
  status: mysqlEnum('status', ['pending', 'running', 'completed', 'failed']).default('pending').notNull(),
  issuesFound: int('issuesFound').default(0).notNull(),
  spaceRecoverable: int('spaceRecoverable').default(0), // in MB
  details: text('details'), // JSON string with detailed results
  startedAt: timestamp('startedAt').defaultNow().notNull(),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type ScanResult = typeof scanResults.$inferSelect;
export type InsertScanResult = typeof scanResults.$inferInsert;

// Optimization reports table
export const optimizationReports = mysqlTable('optimization_reports', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  recommendations: text('recommendations'), // JSON string with recommendations
  estimatedGain: int('estimatedGain'), // percentage or MB
  applied: int('applied').default(0).notNull(), // boolean as int
  appliedAt: timestamp('appliedAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type OptimizationReport = typeof optimizationReports.$inferSelect;
export type InsertOptimizationReport = typeof optimizationReports.$inferInsert;

// Process monitoring table
export const processMonitoring = mysqlTable('process_monitoring', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  processName: varchar('processName', { length: 255 }).notNull(),
  processId: int('processId').notNull(),
  cpuUsage: int('cpuUsage').notNull(), // percentage
  memoryUsage: int('memoryUsage').notNull(), // in MB
  status: varchar('status', { length: 50 }).notNull(), // 'running', 'suspended', 'stopped'
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type ProcessMonitoring = typeof processMonitoring.$inferSelect;
export type InsertProcessMonitoring = typeof processMonitoring.$inferInsert;

// Hardware information table
export const hardwareInfo = mysqlTable('hardware_info', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  cpuModel: varchar('cpuModel', { length: 255 }),
  cpuCores: int('cpuCores'),
  cpuThreads: int('cpuThreads'),
  cpuFrequency: varchar('cpuFrequency', { length: 100 }),
  gpuModel: varchar('gpuModel', { length: 255 }),
  ramCapacity: int('ramCapacity'), // in MB
  ramType: varchar('ramType', { length: 100 }),
  ramSpeed: varchar('ramSpeed', { length: 100 }),
  storageTotal: int('storageTotal'), // in MB
  osVersion: varchar('osVersion', { length: 255 }),
  osArchitecture: varchar('osArchitecture', { length: 50 }),
  motherboard: varchar('motherboard', { length: 255 }),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type HardwareInfo = typeof hardwareInfo.$inferSelect;
export type InsertHardwareInfo = typeof hardwareInfo.$inferInsert;

// Alerts configuration table
export const alertConfigs = mysqlTable('alert_configs', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  alertType: varchar('alertType', { length: 50 }).notNull(), // 'disk_full', 'high_cpu', 'high_memory', 'suspicious_process', 'registry_error'
  enabled: int('enabled').default(1).notNull(), // boolean as int
  threshold: int('threshold'), // percentage or value
  emailNotification: int('emailNotification').default(1).notNull(), // boolean as int
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type AlertConfig = typeof alertConfigs.$inferSelect;
export type InsertAlertConfig = typeof alertConfigs.$inferInsert;

// Alert history table
export const alertHistory = mysqlTable('alert_history', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull().references(() => users.id),
  alertType: varchar('alertType', { length: 50 }).notNull(),
  message: text('message').notNull(),
  severity: mysqlEnum('severity', ['info', 'warning', 'critical']).default('info').notNull(),
  emailSent: int('emailSent').default(0).notNull(), // boolean as int
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type AlertHistory = typeof alertHistory.$inferSelect;
export type InsertAlertHistory = typeof alertHistory.$inferInsert;