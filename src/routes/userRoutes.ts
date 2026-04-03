import { Router } from 'express';
import { deleteUserController, getUserController, updateUserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', getUserController);
router.patch('/:id', authMiddleware, updateUserController);
router.delete("/:id", deleteUserController);

export default router;