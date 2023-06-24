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

  if (!req.body.url) {
    res.status(400).json({ error: "url field is required" });
    return;
  }

  if (!req.body.likes) {
    req.body.likes = 0;
  }

  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

blogsRouter.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (deletedBlog) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(400).json({ error: "malformed id" });
    }
  }
});

module.exports = blogsRouter;
