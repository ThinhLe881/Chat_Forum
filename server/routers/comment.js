import express from 'express';
import { addComment, deleteComment, editComment, getCommentById } from '../controllers/comment.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:id', getCommentById);
router.post('/:id', verifyUserToken, addComment(false));
router.post('/child/:id', verifyUserToken, addComment(true));
router.patch('/:id', verifyUserToken, editComment);
router.delete('/:id', verifyUserToken, deleteComment);

export default router;
