const express = require('express');
const { createBlog, fetchAllBlog, fetchSingleBlog, likeBlog, disLikeBlog } = require('../controllers/blogController');
const { checkAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', fetchAllBlog);
router.get('/:id', fetchSingleBlog);
router.post('/add', createBlog);
router.put("/:id/like", checkAuth, likeBlog);
router.put("/:id/dislike", checkAuth, disLikeBlog);

module.exports = router