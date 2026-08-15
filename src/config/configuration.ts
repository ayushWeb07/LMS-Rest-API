export default () => ({
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
    user: process.env.DATABASE_USER ?? 'root',
    pass: process.env.DATABASE_PASS ?? 'root',
    name: process.env.DATABASE_NAME ?? 'my_db',
  },
  server: {
    port: parseInt(process.env.SERVER_PORT ?? '8080', 10),
    env: process.env.NODE_ENV ?? 'development',
  },
});
