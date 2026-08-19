/** This is Interface for Server config */
export interface IServerConfig {
  /** The port where the server will run */
  port: number;

  /** The node env */
  env: string;

  jwtSecretKey: string;

  jwtExpires: number;
}
