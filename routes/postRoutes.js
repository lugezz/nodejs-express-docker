const express = require('express');

const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Localhost:3000/api/v1/posts
router.route('/')
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);

// Localhost:3000/api/v1/posts/123456
router.route('/:id')
    .get(protect, postController.getPost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;
