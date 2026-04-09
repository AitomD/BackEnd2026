import { Router } from 'express';
import { toggleFavorite} from '../controllers/favoriteController'
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/favorites/:id', authMiddleware ,toggleFavorite);