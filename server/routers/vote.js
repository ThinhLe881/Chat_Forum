import { verifyAdminToken } from '../middlewares/verifyToken.js';
import { deleteVotes } from '../controllers/vote.js';
import express from 'express';

const router = express.Router();

router.delete('/', verifyAdminToken, deleteVotes);

export default router;
