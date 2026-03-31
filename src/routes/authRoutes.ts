import { Router } from 'express';
import { register,login} from '../controllers/authControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/users',register)
router.post("/login", login);


router.get('/Garagem', authMiddleware, (req, res) => {
    res.json({ message: "Você está autenticado!", user: (req as any).user });
});

export default router;









