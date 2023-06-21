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

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  if (blogs.length === 1) {
    return blogs[0];
  }

  const reducer = (blogWithMaxLikes, currentBlog) =>
    currentBlog.likes > blogWithMaxLikes.likes ? currentBlog : blogWithMaxLikes;

  return blogs.reduce(reducer, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
