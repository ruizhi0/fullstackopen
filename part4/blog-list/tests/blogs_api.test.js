const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);
const initialBlogs = [
  {
    title: "Get ready for fsharpConf 2023!",
    author: "Petr Semkin",
    url: "https://devblogs.microsoft.com/dotnet/tune-in-for-fsharpconf-2023/",
    likes: 1,
  },
  {
    title: "Introducing the New T4 Command-Line Tool for .NET",
    author: "Mike Corsaro",
    url: "https://devblogs.microsoft.com/dotnet/t4-command-line-tool-for-dotnet/",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promises = blogs.map((blog) => blog.save());
  await Promise.all(promises);
});

test("GET blogs returns application/json content", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterEach(async () => {
  mongoose.connection.close();
});
