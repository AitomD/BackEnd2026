import prisma from '../config/database';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const createUserService = async (data:any) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password,saltRounds) 

    const existingUser = await prisma.user.findUnique({where:{email: data.email}});
    if(existingUser) {
        throw new Error ('E-mail já cadastrado!');
    }

    return await prisma.user.create({
        data:{
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            cep: data.cep,
            number:data.number,
            password: hashedPassword,
            active: data.active
        }
    })
}
 
export const loginService = async (email:string) => {
    return await prisma.user.findUnique({
        where:{email},
    })
}


export const getUserByIdService = async (id: string) => {
    console.log("ID recebido no service:", id); 
    return await prisma.user.findUnique({
        where: { id },
        select: { 
            id: true,
            name: true,
            email: true,
            cpf: true,
            cep: true,
            number: true
        }    
    });
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    
    await prisma.user.update({
      where: { id: id as string },
      data: { active: false } 
    });

    return res.status(200).json({ message: "Usuário desativado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao desativar usuário." });
  }
};
















