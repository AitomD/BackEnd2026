import { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [scheme, token] = req.headers.authorization?.split(" ") || [];

  if (!token || !/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ message: "Token Não Fornecido ou Malformatado" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload & { id: string; email: string };
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Token Inválido ou Expirado!" });
  }
};
