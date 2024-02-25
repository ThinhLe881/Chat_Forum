import {
	getTopics,
	getPostsByTopic,
	createTopic,
	deleteTopic,
	favoriteTopic,
	leaveTopic,
	joinTopic,
} from '../controllers/topic.js';
import express from 'express';

const router = express.Router();

router.get('/', getTopics);
router.get('/:topic', getPostsByTopic);
router.post('/:topic', createTopic);
router.post('/join/:topic', joinTopic);
router.post('/leave/:topic', leaveTopic);
router.patch('/favorite/:topic/:fav', favoriteTopic);
router.delete('/:topic', deleteTopic);

export default router;
