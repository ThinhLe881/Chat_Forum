import { verifyToken } from '../middleware/auth';
import {
	getUser,
	editUser,
	getUserPosts,
	getVotedPosts,
} from '../controllers/user';

const router = require('express').Router();

router.get('/:id', verifyToken, getUser);
router.patch('/', verifyToken, editUser);
router.get('/posts/:id', verifyToken, getUserPosts);
router.get('/voted/:type', verifyToken, getVotedPosts);

export default router;
