import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http:localhost:5173' // Somente o FrontEnd terá acesso ao back dessa aplicação
}));  

app.use(express.json()); // Permite que o express entenda o JSON no body da requisição

const port = Number(process.env.PORT) || 3001; // Usa a porta do .env ou 3001 como fallback

app.get('/', (req, res) => {
  res.json({ message: "Backend rodando com sucesso!" });
});

app.listen(port, () => {
  console.log(`Servidor online em http://localhost:${port}`);
});