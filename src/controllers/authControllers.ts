import { Request, Response } from 'express';
import { createUserService } from '../services/userService';

export const register = async (req: Request, res : Response) => {
    try {
        const data = req.body;

        const newUser = await createUserService(data);

        return res.status(201).json(newUser);
    }catch (error : any) {
        return res.status(400).json({message : error.message});
    }
}
    









