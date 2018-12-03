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
  };
  return Comment;
};

// The onDelete: CASCADE tells Postgres that if we delete a todo,
// it's associated todo items should be deleted as well (cascade the delete action).
