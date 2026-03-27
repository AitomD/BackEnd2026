import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const newUser = await createUserService(data);

        return res.status(201).json(newUser);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await loginService(email);

        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "E-mail ou senha incorretos" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );

        return res.status(200).json({
            message: "Login realizado!",
            token: token, 
            user: { name: user.name, email: user.email }
        });

    } catch (error: any) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
};








