import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // System metrics and monitoring
  metrics: router({
    getLatestMetrics: protectedProcedure.query(async ({ ctx }) => {
      const metrics = await db.getLatestSystemMetrics(ctx.user.id);
      return metrics || null;
    }),

    getMetricsHistory: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === 'object' && val !== null && 'hours' in val) {
          return { hours: (val as { hours: number }).hours };
        }
        return { hours: 24 };
      })
      .query(async ({ ctx, input }) => {
        return db.getSystemMetricsHistory(ctx.user.id, input.hours);
      }),
  }),

  // Scan operations
  scans: router({
    getScanResults: protectedProcedure.query(async ({ ctx }) => {
      return db.getScanResults(ctx.user.id);
    }),

    startScan: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === 'string') {
          return val;
        }
        throw new Error('Invalid scan type');
      })
      .mutation(async ({ ctx, input: scanType }) => {
        return db.createScanResult({
          userId: ctx.user.id,
          scanType,
          status: 'pending',
          issuesFound: 0,
        });
      }),
  }),

  // Hardware information
  hardware: router({
    getInfo: protectedProcedure.query(async ({ ctx }) => {
      return db.getHardwareInfo(ctx.user.id);
    }),
  }),

  // Alerts
  alerts: router({
    getConfigs: protectedProcedure.query(async ({ ctx }) => {
      return db.getAlertConfigs(ctx.user.id);
    }),

    getHistory: protectedProcedure.query(async ({ ctx }) => {
      return db.getAlertHistory(ctx.user.id);
    }),
  }),

  // Reports
  reports: router({
    getReports: protectedProcedure.query(async ({ ctx }) => {
      return db.getOptimizationReports(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
