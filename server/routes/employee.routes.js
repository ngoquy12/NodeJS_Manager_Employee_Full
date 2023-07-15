const express = require("express");
const database = require("../connection/connectionMySQL");

const route = express.Router();

// Lấy thông tin tất cả employee
route.get("/", (req, res) => {
  const queryString = "SELECT * FROM employees";
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMessage: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        results: result.length,
        data: result,
      });
    }
  });
});
module.exports = route;
