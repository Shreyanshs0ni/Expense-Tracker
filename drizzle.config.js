export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};
