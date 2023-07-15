const mysql = require("mysql");

const conect = mysql.createConnection({
  host: "localhost",
  password: "22121944",
  user: "root",
  database: "manager_user",
  port: 3306,
});

conect.connect((err, result) => {
  if (err) {
    console.log("Connect False", err);
  } else {
    console.log("Conect Success!");
  }
});

module.exports = conect;
