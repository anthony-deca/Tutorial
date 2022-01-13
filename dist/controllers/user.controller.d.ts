import { Request, Response, NextFunction } from "express";
declare function register(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
declare function login(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function logout(req: Request, res: Response, next: NextFunction): Promise<void>;
export { register, login, logout };
