import { verifyAdmin } from '../middlewares/auth.js';
import { deleteVotes } from '../controllers/vote.js';
import express from 'express';

const router = express.Router();

router.delete('/', verifyAdmin, deleteVotes);

export default router;
