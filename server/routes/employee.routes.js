const express = require("express");
const database = require("../connection/connectionMySQL");
const cors = require("cors");

const route = express.Router();
route.use(cors());

// Lấy thông tin tất cả employee + Phân trang và tìm kiếm
route.get("/", (req, res) => {
  // Lấy tên cần tìm kiếm
  const { nameSearch } = req.query;
  // Lấy số lượng bản ghi
  const pageSize = parseInt(req.query.limit) || 10;
  // Lấy trang hiện tại
  const page = parseInt(req.query.offset) || 1;
  // Đếm số lượng bản ghi trong db
  let countEmployee = "SELECT COUNT(*) as total FROM employees";
  // Câu truy vấn lấy thông tin tất cả nhân viên
  let queryString =
    "SELECT * FROM employees as e  join departments as d on e.DepartmentId  = d.DepartmentId";

  if (nameSearch) {
    queryString += ` WHERE EmployeeName LIKE '%${nameSearch}%' OR EmployeeCode LIKE '%${nameSearch}%'`;
    countEmployee += ` WHERE EmployeeName LIKE '%${nameSearch}%' OR EmployeeCode LIKE '%${nameSearch}%'`;
  }

  // Vị trí bắt đầu lấy
  const offset = (page - 1) * pageSize;
  queryString += ` LIMIT ${pageSize} OFFSET ${offset}`;

  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMessage: err,
      });
    } else {
      database.query(countEmployee, (errCount, countResult) => {
        if (errCount) {
          return res.status(500).json({
            status: 500,
            devMessage: err,
          });
        } else {
          // Tổng số bản ghi tìm thấythấy
          const totalResult = countResult[0].total;
          // Phân trang
          const totalPage = Math.ceil(totalResult / pageSize);
          return res.status(200).json({
            status: 200,
            results: result.length,
            totalPage: totalPage, // Số trang
            data: result,
            totalResult: totalResult,
          });
        }
      });
    }
  });
});

module.exports = route;
