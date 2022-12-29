import { verifyToken } from '../middleware/auth.js';
import { getPosts, addPost, editPost, deletePost, votePost } from '../controllers/post.js';
import express from 'express';

const router = express.Router();

router.get('/', getPosts);
router.post('/', verifyToken, addPost);
router.patch('/:id', verifyToken, editPost);
router.delete('/:id', verifyToken, deletePost);
router.patch('/votes/:type/:id', verifyToken, votePost);

export default router;
