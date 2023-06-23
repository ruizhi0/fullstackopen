const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/blogs", async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "title field is required" });
    return;
  }

  if (!req.body.likes) {
    req.body.likes = 0;
  }

  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

module.exports = blogsRouter;
