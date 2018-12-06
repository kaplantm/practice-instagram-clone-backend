"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.STRING, allowNull: false },
      image_url: { type: DataTypes.STRING, allowNull: false },
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No Comment"
      }
    },
    {}
  );
  Post.associate = models => {
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE"
    });
  };
  return Post;
};
