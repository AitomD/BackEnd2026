import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import carsRoutes from "./routes/carRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import {
  getUserController,
  updateUserController,
} from "./controllers/userController";
import userGarageRoutes from "./routes/userGarageRoutes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "Backend rodando com sucesso!" });
});

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/garage", userGarageRoutes);
app.use("/favorites", favoriteRoutes);

// 👉 AQUI
app.use("/cars", carsRoutes);

export default app;
