import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/userService';
import bcrypt from 'bcrypt';


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

        res.status(200).json({
            message: "Login realizado!",
            user: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: "Erro no servidor" });
    }
}









