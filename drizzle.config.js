import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://expense-tracker_owner:NH8G5ksXTmcA@ep-round-truth-a1eb05ae.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require",
  },
});
