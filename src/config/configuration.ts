export default () => ({
  database: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
});
