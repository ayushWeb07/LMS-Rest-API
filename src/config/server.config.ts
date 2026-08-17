import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: parseInt(process.env.SERVER_PORT ?? '8080', 10),
  env: process.env.NODE_ENV ?? 'development',
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? '',
  jwtExpires: process.env.JWT_EXPIRES ?? 3600,
}));
