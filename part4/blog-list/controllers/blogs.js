const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(400).json({
      error: "missing user",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({
      error: "invalid token",
    });
  }

  const user = await User.findById(decodedToken.id);

  const deletedBlog = await Blog.findOneAndDelete({ _id: id, user: user._id });
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const user = await User.findById(body.user);
  if (!user) {
    return res.status(400).json({
      error: "missing user id",
    });
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  };

  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blog, {
    new: true,
    runValidators: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
