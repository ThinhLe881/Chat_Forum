import { verifyUserToken } from '../middlewares/verifyToken.js';
import {
	getPosts,
	getPostById,
	addPost,
	editPost,
	deletePost,
	votePost,
} from '../controllers/post.js';
import express from 'express';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', verifyUserToken, addPost);
router.patch('/:id', verifyUserToken, editPost);
router.delete('/:id', verifyUserToken, deletePost);
router.patch('/:id/votes/:option/:type', verifyUserToken, votePost);

export default router;
