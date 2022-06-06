import { Router } from 'express';
import requireLogin from '../middleware/authenticate'
import { createTutorial, getAllTutorial, getATutorial, updateATutorial, removeATutorial, removeAllTutorials } from '../controllers/tutorial.controller';

const router = Router();

router.post("/", requireLogin, createTutorial);
router.get('/', requireLogin, getAllTutorial);
router.get("/:id", requireLogin, getATutorial);
router.put("/:id", requireLogin, updateATutorial);
router.delete("/:id",requireLogin, removeATutorial);
router.delete("/", requireLogin, removeAllTutorials);

export default router;