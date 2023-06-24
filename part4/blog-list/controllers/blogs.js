const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

blogsRouter.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;

  const deletedBlog = await Blog.findByIdAndRemove(id);
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
