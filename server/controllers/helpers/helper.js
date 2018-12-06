"use strict";
module.exports.sort = (sort_query, Post) => {
  let sort_direction = (sort_query && sort_query[0]) == "-" ? "ASC" : "DESC";
  let sort_string =
    sort_query && sort_query[0] == "-" ? sort_query.slice(1) : sort_query;
  sort_string = Object.keys(Post.rawAttributes).includes(sort_string)
    ? sort_string
    : "createdAt";

  return [sort_string, sort_direction];
};
module.exports.includes = (include_query, User, Comment, Post) => {
  let inclusions = [];
  if (include_query && include_query.includes("comments")) {
    inclusions.push({
      model: Comment,
      as: "comments",
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });
  }
  if (include_query && include_query.includes("user")) {
    inclusions.push({
      model: User,
      as: "user"
    });
  }
  return inclusions;
};
