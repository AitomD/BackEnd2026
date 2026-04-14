import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const publicUserGet =
        req.method === 'GET' &&
        req.baseUrl === '/users';

    if (publicUserGet) {
        return next();
    }

    const [scheme, token] = req.headers.authorization?.split(' ') || [];

    if (!token || !/^Bearer$/i.test(scheme)) 
        return res.status(401).json({ message: "Token Não Fornecido ou Malformatado" });

    try {
        (req as any).user = jwt.verify(token, process.env.JWT_SECRET as string);
        return next();
    } catch {
        return res.status(401).json({ message: "Token Inválido ou Expirado!" });
    }
};