const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/blogs", (request, response) => {
  if (!request.body.title) {
    response.status(400).json({ error: "title field is required" });
    return;
  }

  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
