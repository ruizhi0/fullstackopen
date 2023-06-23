const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const res = await api.get("/api/notes");

  expect(res.body).toHaveLength(initialNotes.length);
});

test("a specific note is returned within the notes", async () => {
  const res = await api.get("/api/notes");

  const contents = res.body.map((r) => r.content);
  expect(contents).toContain("Browser can only execute JavaScript");
});

afterAll(async () => {
  await mongoose.connection.close();
});
