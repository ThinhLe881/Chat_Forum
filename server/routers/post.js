import express from 'express';
import { addPost, deletePost, editPost, getPostById, getPosts } from '../controllers/post.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyUserToken, getPosts);
router.get('/:id', verifyUserToken, getPostById);
router.post('/', verifyUserToken, addPost);
router.patch('/:id', verifyUserToken, editPost);
router.delete('/:id', verifyUserToken, deletePost);

export default router;
