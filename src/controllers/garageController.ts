import { Request, Response } from "express";
import prisma from "../config/database";

export const createProposal = async (req: Request, res: Response) => {
  try {
    const { offeredValue, message, carId } = req.body;
    const userId = (req as any).user?.id as string;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!carId || !offeredValue) {
      return res
        .status(400)
        .json({ error: "carId e offeredValue são obrigatórios." });
    }

    const firstImage = await prisma.image.findFirst({
      where: { carId },
      orderBy: { id: "asc" },
    });

    const newProposal = await prisma.garage.create({
      data: {
        offeredValue: offeredValue,
        message: message,
        carId: carId,
        userId: userId,
        carImageUrl: firstImage?.url,
        status: "Pendente",
      },
    });

    return res.status(201).json(newProposal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao enviar proposta." });
  }
};
export const getUserProposals = async (req: Request, res: Response) => {
  try {
    const sessionUserId = (req as any).user?.id as string;
    const requestedUserId = req.params.id as string;

    if (!sessionUserId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const proposals = await prisma.garage.findMany({
      where: { userId: sessionUserId },
      include: {
        car: {
          select: {
            name: true,
            images: {
              select: {
                url: true,
              },
              orderBy: {
                id: "asc",
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        date_offer: "desc",
      },
    });

    // Mapeia os dados para garantir que o frontend receba um formato consistente
    const formattedProposals = proposals.map((proposal) => ({
      id: proposal.id,
      offeredValue: proposal.offeredValue,
      status: proposal.status,
      imgUrl: proposal.car?.images[0]?.url || proposal.carImageUrl || null,
      name: proposal.car?.name || "Veículo não identificado",
      message: proposal.message,
    }));

    return res.status(200).json(formattedProposals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar propostas." });
  }
};
