const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginsRouter = require("express").Router();
const logger = require("../utils/logger");

loginsRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !password) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });

  res.json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginsRouter;
