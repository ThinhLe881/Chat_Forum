import { verifyToken } from '../middlewares/auth.js';
import { getUser, editUser, getUserPosts, getVotedPosts } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.patch('/', verifyToken, editUser);
router.get('/posts/:id', verifyToken, getUserPosts);
router.get('/voted/:type', verifyToken, getVotedPosts);

export default router;
