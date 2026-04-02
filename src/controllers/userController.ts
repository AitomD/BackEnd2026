import { Request, Response } from 'express';
import { getUserByIdService } from '../services/userService';
import { stringify } from 'node:querystring';

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params; // Captura o UUID da URL

  if (!id || id === 'undefined' || id === ':id') {
    return res.status(400).json({ error: "ID de usuário inválido" });
  }
  
  try {
    const user = await getUserByIdService(id as string);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado no banco" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};