import { Router } from 'express';
import {register, login, logout} from '../controllers/user.controller';

const router = Router();
router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);


export default router;