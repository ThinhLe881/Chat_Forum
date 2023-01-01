import {
	getComments,
	addComment,
	addChildComment,
	editComment,
	deleteComment,
	voteComment,
	deleteChildComment,
} from '../controllers/comment.js';
import { verifyToken } from '../middlewares/auth.js';
import express from 'express';

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', verifyToken, addComment);
router.post('/child/:id', verifyToken, addChildComment);
router.patch('/:id', verifyToken, editComment);
router.delete('/:id', verifyToken, deleteComment);
router.delete('/child/:id', verifyToken, deleteChildComment);
router.patch('/:id/votes/:type', verifyToken, voteComment);

export default router;
