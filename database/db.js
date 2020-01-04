const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "3o4Qp0UaYn",
    password: "tDsICUNOEz",
    database: "3o4Qp0UaYn"
  });

  
  connection.connect(err => {
    if (err) {console.error("Error connection to database");

    console.log(err)}
    else console.log("Database connected");
  });
  

  module.exports = connection