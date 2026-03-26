import { Router } from 'express';
import { register,login} from '../controllers/authControllers';

const router = Router();

router.post('/users',register)
router.post("/login", login);

export default router;









