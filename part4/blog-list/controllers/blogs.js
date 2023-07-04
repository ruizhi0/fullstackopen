const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedBlog = await Blog.findByIdAndRemove(id);
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blog, {
    new: true,
    runValidators: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
