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

describe("get blogs", () => {
  test("returned in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned all blogs", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(initialBlogs.length);
  });

  test("each blog has 'id' field", async () => {
    const res = await api.get("/api/blogs");

    res.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("create a new blog", () => {
  test("filled all fields", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
      author: "Ray Yao",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const latestBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(latestBlogs).toHaveLength(initialBlogs.length + 1);
    const titles = latestBlogs.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test("likes default to zero if unspecified", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
      author: "Ray Yao",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const latestBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(latestBlogs).toHaveLength(initialBlogs.length + 1);
    expect(
      latestBlogs.filter((blog) => blog.title === newBlog.title)[0].likes
    ).toBe(0);
  });

  test("filled none field", async () => {
    const res = await api.post("/api/blogs").expect(400);

    expect(res.body).toEqual({ error: "title field is required" });
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
