import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token Não Fornecido" });
    }

    const parts = authHeader.split('');
    const [scheme, token] = parts;

    if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token Malformatado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Adiciona os dados do token dentro da requisição para uso posterior
        (req as any).user = decoded;

        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token Inválido ou Expirado!" })
    }
}





