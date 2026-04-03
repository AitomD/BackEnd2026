import { Request, Response } from "express";
import { getUserByIdService } from "../services/userService";
import { stringify } from "node:querystring";
import prisma from "../config/database"
import bcrypt from 'bcrypt';

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params; 
  if (!id || id === "undefined" || id === ":id") {
    return res.status(400).json({ error: "ID de usuário inválido" });
  }
  try {
    const user = await getUserByIdService(id as string);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado no banco" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};


export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { password, ...data } = req.body;
    const id = req.params.id as string; 
    if (password) data.password = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({ where: { id }, data });
    return res.status(200).json(user);
  } catch (e) { 
    return res.status(500).json({ message: "Erro ao atualizar" }); 
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; 
    await prisma.user.update({
      where: { id: id }, 
      data: { active: false } 
    });
    return res.status(200).json({ message: "Usuário desativado" }); 
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar" });
  }

};