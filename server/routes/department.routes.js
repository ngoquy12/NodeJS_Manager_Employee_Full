const express = require("express");
const database = require("../connection/connectionMySQL");
const cors = require("cors");

const route = express.Router();
route.use(cors());

// Lấy thông tin tất cả department
route.get("/", (req, res) => {
  const queryString = "SELECT * FROM departments";
  database.query(queryString, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        userMsg: "Lỗi hệ thống",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: results,
      });
    }
  });
});

// Lấy thông tin phòng ban theo Id
route.get("/:id", (req, res) => {
  const { id } = req.params;
  const queryString = "SELECT * FROM departments WHERE DepartmentId = ? ";
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        userMsg: "Lỗi hệ thống",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
});

module.exports = route;
