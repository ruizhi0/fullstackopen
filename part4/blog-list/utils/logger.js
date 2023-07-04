const info = (...params) => {
  if (process.env.NODE_ENV === "testing") {
    return;
  }

  console.log(...params);
};

const error = (...params) => {
  if (process.env.NODE_ENV === "testing") {
    return;
  }

  console.error(...params);
};

module.exports = {
  info,
  error,
};
