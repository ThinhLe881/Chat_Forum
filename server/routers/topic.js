import express from 'express';
import {
	createTopic,
	deleteTopic,
	favoriteTopic,
	getPostsByTopic,
	getUserTopics,
	joinTopic,
	leaveTopic,
} from '../controllers/topic.js';
import { checkTopicExist, cleanUpDeletedTopic } from '../middlewares/topic.js';
import { verifyUserToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:topic', getPostsByTopic);
router.get('/', verifyUserToken, getUserTopics);
router.post('/create/:topic', verifyUserToken, createTopic);
router.post('/join/:topic', verifyUserToken, checkTopicExist, joinTopic);
router.post('/leave/:topic', verifyUserToken, checkTopicExist, leaveTopic);
router.patch('/favorite/:topic', verifyUserToken, checkTopicExist, favoriteTopic(true));
router.patch('/unfavorite/:topic', verifyUserToken, checkTopicExist, favoriteTopic(false));
router.delete('/:topic', verifyUserToken, deleteTopic, cleanUpDeletedTopic);

export default router;
