const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwertyhnjkl",
    database: "login"
  });

  
  connection.connect(err => {
    if (err) {console.error("Error connection to database");

    console.log(err)}
    else console.log("Database connected");
  });
  

  module.exports = connection