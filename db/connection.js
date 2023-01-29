const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  module.exports = connection;