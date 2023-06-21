const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return 1;
  }

  const reducer = (sum, blog) => sum + blog.totalLikes;

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
