// In this file, we are requiring the modules we're going to be using. Then, we're reading
// the configuration specific to our current Node environment. If we don't have a Node
// environment defined, we're defaulting to development. Then, we are establishing a
// connection with our database, after which we read our models folder, discovering and
// importing any and all the models in it, adding them to the db object and applying
// relationships between the models, if such relationships exist.
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#toc-project-setup

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const dotenv = require("dotenv").config();
const env = process.env.NODE_ENV || "production";
const config = require(`${__dirname}/../config/config`)[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    operatorsAliases: Sequelize.Op
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
