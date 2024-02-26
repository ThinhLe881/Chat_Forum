import express from 'express';
import {
	editUserEmail,
	editUserName,
	getUser,
	getUserPosts,
	getVotedPosts,
} from '../controllers/user.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/stats/:id', getUser);
router.get('/posts/:id', getUserPosts);
router.get('/up', verifyUserToken, getVotedPosts(true));
router.get('/down', verifyUserToken, getVotedPosts(false));
router.patch('/name', verifyUserToken, editUserName);
router.patch('/email', verifyUserToken, editUserEmail);

export default router;
