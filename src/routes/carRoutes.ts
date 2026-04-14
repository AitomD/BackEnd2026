import { Router } from "express";
import { getCars, getCarById } from "../services/carService";

const router = Router();

// Rota para listar todos
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const cars = await getCars(page, limit);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar carros" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await getCarById(id);

    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado no banco" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar detalhes do carro" });
  }
});

export default router;
