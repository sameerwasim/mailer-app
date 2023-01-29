const mysql = require("mysql2");

module.exports = () => {
  try {
    return mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
    });
  } catch (err) {
    return false;
  }
};
