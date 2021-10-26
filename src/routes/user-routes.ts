import { Router } from 'express';
import {register, login} from '../controllers/user.controller';

const router = Router();
router.post("/register", register);
router.get("/login", login);


export default router;