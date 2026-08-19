/** This is Interface for Database config */
export interface IDatabaseConfig {
  /** The database host */
  host: string;
  /** The database port */
  port: number;
  /** The database username */
  user: string;
  /** The database password */
  pass: string;
  /** The database name */
  name: string;
}
