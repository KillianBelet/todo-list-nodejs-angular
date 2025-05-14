const express = require("express");
const requireAuth = require('../middleware/auth.middleware'); 
const { setPosts, getPosts, editPost, deletePost, likePosts, dislikePosts } = require("../controllers/post.controller");
const router = express.Router();

router.use(requireAuth);

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", editPost);  
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePosts);
router.patch("/dislike-post/:id", dislikePosts);

module.exports = router;