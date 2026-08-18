export {};

declare global {
  namespace Express {
    interface Request {
      userId: number | undefined;
      userEmail: string | undefined;
    }
  }
}
