import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Backend rodando com sucesso!" });
});

app.use('/auth', authRoutes);

export default app;







