import { register, login } from '../controllers/auth.js';
import { registerLimiter, loginLimiter } from '../middlewares/apiLimiter.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);

export default router;
