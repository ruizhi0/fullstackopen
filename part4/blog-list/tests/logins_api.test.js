const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initialUser = {
  username: "root",
  name: "root",
  password: "root",
};

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(initialUser.password, 10);

  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash,
  });

  await user.save();
});

describe("login", () => {
  test("username and password provided", async () => {
    const res = await api
      .post("/api/logins")
      .send(initialUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body.username).toEqual(initialUser.username);
  });

  test("username not provided", async () => {
    const res = await api
      .post("/api/logins")
      .send({
        password: initialUser.password,
      })
      .expect(401);

    expect(res.body.error).toMatch(/invalid username or password/);
  });

  test("password not provided", async () => {
    const res = await api
      .post("/api/logins")
      .send({
        username: initialUser.username,
      })
      .expect(401);

    expect(res.body.error).toMatch(/invalid username or password/);
  });

  test("username and password not provided", async () => {
    const res = await api.post("/api/logins").send({}).expect(401);

    expect(res.body.error).toMatch(/invalid username or password/);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
