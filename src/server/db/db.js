const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thewings21092003",
  database: "sneakerstore",
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to MySQL: ${err}`);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;