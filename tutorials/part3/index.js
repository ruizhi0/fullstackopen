require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.json(note);
    })
    .catch((error) => {
      res.status(404).end();
    });
});

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id).then((deletedNote) => {
    if (deletedNote) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "missing content",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).end();
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);
