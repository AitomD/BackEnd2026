import { Router } from "express";
import { register, login } from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

import { getUserController } from "../controllers/userController";

const router = Router();

router.post("/users", register);
router.post("/login", login);

router.get("/Garagem/:id", authMiddleware, getUserController);

export default router;
