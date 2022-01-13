import { Router } from 'express';
import requireLogin from '../middleware/authenticate'
import { createTutorial, getAllTutorial, getATutorial, updateATutorial, removeATutorial, removeAllTutorials } from '../controllers/tutorial.controller';

const router = Router();

router.post("/", createTutorial);
router.get('/', getAllTutorial);
router.get("/:id", getATutorial);
router.put("/:id", updateATutorial);
router.delete("/:id", removeATutorial);
router.delete("/", removeAllTutorials);

export default router;