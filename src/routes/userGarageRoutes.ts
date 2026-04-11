import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createProposal,
  getUserProposals,
} from "../controllers/garageController";

const router = Router();

router.get("/:id", authMiddleware, getUserProposals);
router.post("/proposals", authMiddleware, createProposal);

export default router;
