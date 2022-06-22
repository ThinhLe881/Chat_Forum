const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Thread = require('../models/thread.model');
const verify = require('../auth/verifyToken');

// Get all posts
router.get('/', verify, async (req, res) => {
  try {
    const posts = await Thread.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get post by id
router.get('/:id', verify, async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Thread.findById(id);
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all user's posts
router.get('/user', verify, async (req, res) => {
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  // Get posts
  try {
    const posts = await Thread.find({"creatorId": verified.id});
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all comments of a post or a parent comment
router.get('/comment/:id', verify, async (req, res) => {
  const parentId = req.params.id;
  // Post's id validation
  if (!mongoose.Types.ObjectId.isValid(parentId)) {
    return res.status(404).send(`No thread with id: ${parentId}`);
  }
  // Get comments
  try {
    const comments = await Thread.find({"parentId": parentId});
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add new post
router.post('/', verify, async (req, res) => {
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const creatorId = verified.id;
  // Create a new thread
  const thread = new Thread ({
    creatorId: creatorId,
    content: req.body.content,
    title: req.body?.title,
    tags: req.body?.tags,
    image: req.body?.image
  })
  try {
    const newThread = await thread.save();
    const creator = await User.findById(creatorId);
    const updateCreator = await User.findByIdAndUpdate(creatorId, {posts: creator.posts + 1}, {new: true})
    res.status(201).send({
      thread: newThread,
      msg: 'Post added successfully'
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add new comment or child comment
router.post('/:id', verify, async (req, res) => {
  const parentId = req.params.id;
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const creatorId = verified.id;
  // Post's id validation
  if (!mongoose.Types.ObjectId.isValid(parentId)) {
    return res.status(404).send(`No thread with id: ${parentId}`);
  }
  // Create a new child thread
  const thread = new Thread ({
    creatorId: creatorId,
    parentId: parentId,
    content: req.body.content,
    tags: req.body?.tags,
    image: req.body?.image
  })
  // Save child thread and update parent thread
  try {
    const newThread = await thread.save();
    const parentThread = await Thread.findById(parentId);
    const updateParentThread = await Thread.findByIdAndUpdate(parentId, {comments: parentThread.comments + 1}, {new: true})
    const creator = await User.findById(creatorId);
    const updateCreator = await User.findByIdAndUpdate(creatorId, {comments: creator.comments + 1}, {new: true})
    res.status(201).send({
      thread: newThread,
      msg: 'Comment added successfully'
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update post or comment
router.patch('/:id', verify, async (req, res) => {
  const id = req.params.id;
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const creatorId = verified.id;
  // Post's id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No thread with id: ${id}`);
  }
  // Update thread
  try {
    const thread = await Thread.findById(id);
    if (thread.creatorId === creatorId) {
      const updatedThread = await Thread.findByIdAndUpdate(id, {
        content: req.body?.content,
        title: req.body?.title,
        tags: req.body?.tags,
        image: req.body?.image
      }, {new: true})
      res.status(200).send({
        thread: updatedThread,
        msg: 'Updated successfully'
      });
    } else {
      res.status(401).send('Access denied');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update votes for post or comment
router.patch('/vote/:id', verify, async (req, res) => {
  const id = req.params.id;
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = verified.id;
  // Post's id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No thread with id: ${id}`);
  }
  // Update thread's votes
  try {
    const thread = await Thread.findById(id);
    const updatedThread = await Thread.findByIdAndUpdate(id, {votes: thread.votes + 1}, {new: true})
    const user = await User.findById(userId);
    const updateUser = await User.findByIdAndUpdate(userId, {
      likedPosts: user.likedPosts.push(updatedThread._id),
      votes: user.votes + 1
    }, {new: true})
    res.status(200).send({
      thread: updatedThread,
      msg: 'Updated votes successfully'
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete post or comment
router.delete('/:id', verify, async (req, res) => {
  const id = req.params.id;
  // Get user's id
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const creatorId = verified.id;
  // Post's id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No thread with id: ${id}`);
  }
  try {
    const thread = await Thread.findById(id);
    if (thread.creatorId === creatorId) {
      const deletedThread = await Thread.findByIdAndRemove(id);
      res.status(200).send('Deleted successfully');
    } else {
      res.status(401).send('Access denied');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;