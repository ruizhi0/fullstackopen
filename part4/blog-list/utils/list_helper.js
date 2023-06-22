const lodash = require("lodash");

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

const mostBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorBlogCountAggregates = blogs.reduce((aggr, blog) => {
    aggr[blog.author] = (aggr[blog.author] || 0) + 1;
    return aggr;
  }, []);

  const maxBlogCountPerAuthor = Math.max(
    ...Object.values(authorBlogCountAggregates)
  );
  const mostBlogCountAggregates = Object.keys(authorBlogCountAggregates).filter(
    (key) => authorBlogCountAggregates[key] === maxBlogCountPerAuthor
  );

  return {
    author: mostBlogCountAggregates[0],
    blogs: maxBlogCountPerAuthor,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlog,
};
