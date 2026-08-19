export {};

declare global {
  namespace Express {
    interface Request {
      userId: number | undefined;
      userName: string | undefined;
      userEmail: string | undefined;
    }
  }
}
