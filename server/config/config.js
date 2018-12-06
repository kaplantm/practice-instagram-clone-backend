// changed from json to js to include operatorsAliases: Sequelize.Op
// https://github.com/sequelize/sequelize/issues/8417
// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
// also had to change config path in .sequelizerc
const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");
// console.log(process.env.DATABASE_URL);
module.exports = {
  // use_env_variable: "production",
  development: {
    username: "postgres",
    password: "postgres",
    database: "insta_clone_dev",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: Sequelize.Op
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "insta_clone_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  // production: {
  //   username: "jlivnzjh",
  //   password: "Ixzf5atFKIdnLyO6pxXYgFnwgGDIY8L9",
  //   database: "jlivnzjh",
  //   host: "baasu.db.elephantsql.com",
  //   dialect: "postgres",
  //   operatorsAliases: Sequelize.Op
  // },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};

//sequelize db:migrate NODE_ENV=production DATABASE_URL=postgres://jlivnzjh:Ixzf5atFKIdnLyO6pxXYgFnwgGDIY8L9@baasu.db.elephantsql.com:5432/jlivnzjh
