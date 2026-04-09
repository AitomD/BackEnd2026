import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 
import userRoutes from './routes/userRoutes';
import carsRoutes from "./routes/carRoutes";
import { authMiddleware } from './middlewares/authMiddleware';
import { getUserController, updateUserController } from './controllers/userController';


const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.get('/', (req, res) => {
    res.json({ message: "Backend rodando com sucesso!" });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

//Retorna carros card
app.use(express.json());

// 👉 AQUI
app.use('/cars', carsRoutes);

export default app;


