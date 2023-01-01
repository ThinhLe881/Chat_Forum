import { getTopics, getPostsByTopic } from '../controllers/topic.js';
import express from 'express';

const router = express.Router();

router.get('/', getTopics);
router.get('/:name', getPostsByTopic);

export default router;
