export {};

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
      userEmail: string | undefined;
    }
  }
}
