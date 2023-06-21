const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0 || blogs.length === 1) {
    return blogs.length;
  }

  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
