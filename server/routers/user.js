import { verifyUserToken } from '../middlewares/verifyToken.js';
import { getUser, editUser, getUserPosts, getVotedPosts } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.get('/:id', verifyUserToken, getUser);
router.patch('/', verifyUserToken, editUser);
router.get('/posts/:id', verifyUserToken, getUserPosts);
router.get('/voted/:type', verifyUserToken, getVotedPosts);

export default router;
