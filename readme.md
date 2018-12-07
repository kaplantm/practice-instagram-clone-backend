Node API backend for my instagram clone react native practice app. Learning more about how to make REST APIs.
API connects to postgres database and includes routes for users, posts and comments.

Using express, sequelize, bcrypt, jsonwebtoken

Needs to pull the following values from a .env file
DATABASE_URL= (elephantsql db url)
NODE_ENV= (production or development)
JWT_KEY= (random string)
JWT_REFRESH_KEY= (random string)

References used:

Getting Started with Node, Express and Postgres Using Sequelize
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

JWT Route Protection | Creating a REST API with Node.js
https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13
