// changed from json to js to include operatorsAliases: Sequelize.Op
// https://github.com/sequelize/sequelize/issues/8417
// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
// also had to change config path in .sequelizerc

const Sequelize = require("sequelize");
module.exports = {
  use_env_variable: "development",
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
  production: {
    username: "postgres",
    password: "postgres",
    database: "insta_clone_prod",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
