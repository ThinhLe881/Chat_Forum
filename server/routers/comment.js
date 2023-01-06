import {
	getCommentById,
	addComment,
	addChildComment,
	editComment,
	deleteComment,
	voteComment,
	deleteChildComment,
} from '../controllers/comment.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';
import express from 'express';

const router = express.Router();

router.get('/:id', getCommentById);
router.post('/:id', verifyUserToken, addComment);
router.post('/child/:id', verifyUserToken, addChildComment);
router.patch('/:id', verifyUserToken, editComment);
router.delete('/:id', verifyUserToken, deleteComment);
router.delete('/child/:id', verifyUserToken, deleteChildComment);
router.patch('/:id/votes/:option/:type', verifyUserToken, voteComment);

export default router;
