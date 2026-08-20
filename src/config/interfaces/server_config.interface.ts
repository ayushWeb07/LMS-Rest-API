/** This is Interface for Server config */
export interface IServerConfig {
  /** The port where the server will run */
  port: number;

  /** The node env */
  env: string;

  jwtAccessSecretKey: string;
  jwtAccessExpires: number;
  jwtRefreshSecretKey: string;
  jwtRefreshExpires: number;

  googleClientId: string;
  googleClientSecret: string;
}
