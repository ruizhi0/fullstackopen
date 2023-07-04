const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    username: "root",
    passwordHash: passwordHash,
  });

  await user.save();
});

describe("get users", () => {
  test("returned in json format", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned all users", async () => {
    const res = await api.get("/api/users").expect(200);

    expect(res.body).toHaveLength(1);
  });

  test("each user did not expose 'passwordHash' field", async () => {
    const res = await api.get("/api/users").expect(200);

    res.body.forEach((user) => {
      console.log("user", user);
      expect(user.passwordHash).toBeUndefined();
    });
  });
});

describe("create a user", () => {
  test("username and password provided", async () => {
    const user = {
      username: "test",
      password: "test",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    expect(users.length).toBe(2);
    const usernames = users.map((user) => user.username);
    expect(usernames).toContain(user.username);
  });

  test("username not provided", async () => {
    const user = {
      password: "test",
    };

    const res = await api.post("/api/users").send(user).expect(400);

    expect(res.body.error).toMatch(/username: Path `username` is required/);
  });

  test("username provided less than 3 characters long", async () => {
    const user = {
      username: "te",
      password: "test",
    };

    const res = await api.post("/api/users").send(user).expect(400);

    expect(res.body.error).toMatch(/shorter than the minimum allowed length/);
  });

  test("password not provided", async () => {
    const user = {
      username: "test",
    };

    const res = await api.post("/api/users").send(user).expect(400);

    expect(res.body.error).toMatch(/password must be at least/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
