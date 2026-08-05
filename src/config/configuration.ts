export default () => ({
  port: process.env.PORT || '3000',
  host: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT || '5432',
});
