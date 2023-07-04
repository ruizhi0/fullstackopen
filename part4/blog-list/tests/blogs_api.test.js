const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
const initialBlogs = [
  {
    title: "Get ready for fsharpConf 2023!",
    url: "https://devblogs.microsoft.com/dotnet/tune-in-for-fsharpconf-2023/",
    likes: 1,
  },
  {
    title: "Introducing the New T4 Command-Line Tool for .NET",
    url: "https://devblogs.microsoft.com/dotnet/t4-command-line-tool-for-dotnet/",
    likes: 3,
  },
];

const initialUser = {
  username: "root",
  name: "root",
  password: "root",
};

let user;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  const createdUser = await new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash,
  }).save();

  const loginRes = await api
    .post("/api/logins")
    .send(initialUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  user = {
    id: createdUser._id,
    username: loginRes.body.username,
    token: loginRes.body.token,
  };

  const blogs = initialBlogs.map(
    (blog) =>
      new Blog({
        ...blog,
        user: user.id,
      })
  );

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

  test("each blog has 'user' association", async () => {
    const res = await api.get("/api/blogs");

    res.body.forEach((blog) => {
      expect(blog.user).toBeDefined();
    });
  });
});

describe("create a new blog", () => {
  test("filled all fields", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const latestBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(latestBlogs).toHaveLength(initialBlogs.length + 1);
    const titles = latestBlogs.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
    const createdBlog = latestBlogs.filter(
      (blog) =>
        blog.title === newBlog.title &&
        blog.url === newBlog.url &&
        blog.likes === newBlog.likes &&
        blog.user === user.id
    )[0];
    expect(createdBlog).not.toBeNull();
  });

  test("likes default to zero if unspecified", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const latestBlogs = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(latestBlogs).toHaveLength(initialBlogs.length + 1);
    expect(
      latestBlogs.filter((blog) => blog.title === newBlog.title)[0].likes
    ).toBe(0);
  });

  test("bad request if title is unspecified", async () => {
    const newBlog = {
      author: "Ray Yao",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
    };

    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(400);

    expect(res.body).toEqual({
      error: "Blog validation failed: title: Path `title` is required.",
    });
  });

  test("bad request if url is unspecified", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
    };

    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(400);

    expect(res.body).toEqual({
      error: "Blog validation failed: url: Path `url` is required.",
    });
  });

  test("unauthorized if no bearer token passed", async () => {
    const newBlog = {
      title: "Microsoft Forms Service's Journey to .NET 6",
      url: "https://devblogs.microsoft.com/dotnet/microsoft-forms-services-journey-to-dotnet-6/",
      likes: 2,
    };

    const res = await api.post("/api/blogs").send(newBlog).expect(401);

    expect(res.body.error).toMatch(/missing user/);
  });
});

describe("delete a blog", () => {
  test("existing blog", async () => {
    const latestBlogs = await Blog.find({});
    const existingBlog = latestBlogs[0].toJSON();
    const id = existingBlog.id;

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(204);
  });

  test("not found blog", async () => {
    const id = "000000000000000000000000";

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(404);
  });

  test("bad request if id is malformed", async () => {
    const id = "jfdlka";

    const res = await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "malformed id" });
  });
});

describe("update a blog", () => {
  test("liked the blog", async () => {
    const returnedBlogs = await Blog.find({
      url: "https://devblogs.microsoft.com/dotnet/tune-in-for-fsharpconf-2023/",
    });
    const targetBlog = returnedBlogs[0].toJSON();
    const blog = { ...targetBlog, likes: targetBlog.likes + 1 };

    const res = await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(blog)
      .expect(200);

    expect(res.body).toEqual(blog);
  });

  test("bad request if title is cleared", async () => {
    const returnedBlogs = await Blog.find({
      url: "https://devblogs.microsoft.com/dotnet/tune-in-for-fsharpconf-2023/",
    });
    const targetBlog = returnedBlogs[0].toJSON();
    const blog = { ...targetBlog, title: "" };

    await api.put(`/api/blogs/${targetBlog.id}`).send(blog).expect(400);
  });

  test("bad request if url is cleared", async () => {
    const returnedBlogs = await Blog.find({
      url: "https://devblogs.microsoft.com/dotnet/tune-in-for-fsharpconf-2023/",
    });
    const targetBlog = returnedBlogs[0].toJSON();
    const blog = { ...targetBlog, url: "" };

    await api.put(`/api/blogs/${targetBlog.id}`).send(blog).expect(400);
  });

  test("bad request if id is malformed", async () => {
    const id = "jfdlka";

    const res = await api.put(`/api/blogs/${id}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "malformed id" });
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
