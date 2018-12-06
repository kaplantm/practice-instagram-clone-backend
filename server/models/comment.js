"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.STRING, allowNull: false },
      postId: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Comment.associate = models => {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE"
    });
  };
  return Comment;
};

// The onDelete: CASCADE tells Postgres that if we delete a post,
// it's associated comments should be deleted as well (cascade the delete action).
