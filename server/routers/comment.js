import {
	getComments,
	addComment,
	editComment,
	deleteComment,
	voteComment,
} from '../controllers/comment';
import { verifyToken } from '../middleware/auth';

const router = require('express').Router();

router.get('/:id', getComments);
router.post('/:id', verifyToken, addComment);
router.patch('/:id', verifyToken, editComment);
router.delete('/:id', verifyToken, deleteComment);
router.patch('/votes/:type/:id', verifyToken, voteComment);

export default router;
