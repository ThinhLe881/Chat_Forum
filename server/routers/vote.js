import express from 'express';
import { deleteVotes, voteDoc } from '../controllers/vote.js';
import { verifyAdminToken, verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/up/:id', verifyUserToken, voteDoc(false, true));
router.post('/down/:id', verifyUserToken, voteDoc(false, false));
router.post('/undo/:id', verifyUserToken, voteDoc(true, false));
router.delete('/', verifyAdminToken, deleteVotes);

export default router;
