import { verifyToken } from '../middlewares/auth.js';
import { getPosts, addPost, editPost, deletePost, votePost } from '../controllers/post.js';
import express from 'express';

const router = express.Router();

router.get('/', getPosts);
router.post('/', verifyToken, addPost);
router.patch('/:id', verifyToken, editPost);
router.delete('/:id', verifyToken, deletePost);
router.patch('/:id/votes/:option/:type', verifyToken, votePost);

export default router;
