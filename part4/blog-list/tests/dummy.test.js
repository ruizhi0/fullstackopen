const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("total likes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      totalLikes: 1,
    },
  ];

  const listWithManyBlogs = [
    {
      totalLikes: 1,
    },
    {
      totalLikes: 2,
    },
    {
      totalLikes: 3,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);

    expect(result).toBe(0);
  });

  test("when list has only one blog equals to the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);

    expect(result).toBe(1);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);

    expect(result).toBe(6);
  });
});
