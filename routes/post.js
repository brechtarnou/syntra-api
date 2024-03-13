const express = require("express");
const Post = require("../models/post");
const router = express.Router();
router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    await post.update(req.body);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    await post.destroy();
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

module.exports = router;
