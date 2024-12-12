import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://expense-tracker_owner:NH8G5ksXTmcA@ep-round-truth-a1eb05ae.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require",
);
export const db = drizzle(sql, { schema });
