const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Kiểm tra những trường để trốtrống
 * @param {*} field Tên trường
 * @returns True: Nếu trường đấy để trống và False nếu không để trốtrống
 */
const checkEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Hàm kiểm tra những trường để trống
const checkDataEmpty = (req, res, next) => {
  // Lấy dữ liệu từ phía client
  const { EmployeeCode, EmployeeName, DepartmentId } = req.body;
  // Kiểm tra EmployeeCode không được để trống
  if (checkEmpty(EmployeeCode)) {
    return res.status(400).json({
      status: 400,
      message: "Mã nhân viên không được phép để trống",
    });
  }

  // Kiểm tra EmployeeName không được để trống
  if (checkEmpty(EmployeeName)) {
    return res.status(400).json({
      status: 400,
      message: "Tên nhân viên không được phép để trống",
    });
  }

  // Kiểm tra EmployeeName không được để trống
  if (checkEmpty(DepartmentId)) {
    return res.status(400).json({
      status: 400,
      message: "Tên phòng ban không được phép để trống",
    });
  }
  // Nếu các trường đã có dữ liệu thì next
  next();
};

// Validate email
const validateEmail = (req, res, next) => {
  // Lấy email từ client
  const { Email } = req.body;
  console.log("Email", Email);
  // Dùng regex
  const isMatch = String(Email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (isMatch === null) {
    return res.status(400).json({
      status: 400,
      message: "Email không đúng định dạng",
    });
  }
  // Email đúng định dạng
  next();
};

module.exports = { checkDataEmpty, validateEmail };
