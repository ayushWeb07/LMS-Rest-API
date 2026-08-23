import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: parseInt(process.env.SERVER_PORT ?? '8080', 10),
  env: process.env.NODE_ENV ?? 'development',
  jwtAccessSecretKey: process.env.JWT_ACCESS_SECRET_KEY ?? '',
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES ?? 3600,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY ?? '',
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES ?? 18000,
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  apiVersion: process.env.API_VERSION ?? '1.0.0',
}));
