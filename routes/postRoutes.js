const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

// Localhost:3000/api/v1/posts
router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

// Localhost:3000/api/v1/posts/123456
router.route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;
