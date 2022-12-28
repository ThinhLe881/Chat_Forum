import { register, login } from '../controllers/auth';

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

export default router;
