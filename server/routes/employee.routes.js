const express = require("express");
const database = require("../connection/connectionMySQL");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { FORMATDATERERVESE } = require("../formatData/formatDate");
const { checkDataEmpty, validateEmail } = require("../middleware/validateData");
const bcrypt = require("bcrypt");

const route = express.Router();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));
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

// Lấy thông tin tất cả employee + Phân trang và tìm kiếm
route.get("/:id", (req, res) => {
  // Câu Câu lệnh query
  const queryString =
    "SELECT * FROM employees as e  join departments as d on e.DepartmentId  = d.DepartmentId WHERE EmployeeId = ?";
  const { id } = req.params;
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMessage: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result[0],
      });
    }
  });
});

// API xóa thông tin một nhân viên the id
route.delete("/:id", (req, res) => {
  // Lấy if thông qua param
  const { id } = req.params;
  const queryString = "delete from employees where EmployeeId =  ?"; // Prepare Statement
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
        userMsg: "Xóa thành công",
      });
    }
  });
});

// API thêm mới nhân viên
route.post("/", checkDataEmpty, validateEmail, (req, res) => {
  // Lấy dữ liệu dưới body
  const newId = uuidv4();
  const {
    EmployeeCode,
    EmployeeName,
    DateOfBirth,
    Gender,
    DepartmentId,
    IdentityNumber,
    DateRange,
    Position,
    IssuedBy,
    Address,
    PhoneNumber,
    Password,
    Email,
    BankNumber,
    BankName,
    BankBranch,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy,
  } = req.body;

  // Mã hóa mật khẩu
  bcrypt.hash(Password, 10, (err, isHash) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    } else {
      const newDateOfBirth = FORMATDATERERVESE(DateOfBirth);
      const newCreatedDate = FORMATDATERERVESE(CreatedDate);
      const newModifiedDate = FORMATDATERERVESE(ModifiedDate);

      const newUser = [
        newId,
        EmployeeCode,
        EmployeeName,
        newDateOfBirth,
        Gender,
        DepartmentId,
        IdentityNumber,
        DateRange,
        Position,
        IssuedBy,
        Address,
        PhoneNumber,
        isHash,
        Email,
        BankNumber,
        BankName,
        BankBranch,
        newCreatedDate,
        CreatedBy,
        newModifiedDate,
        ModifiedBy,
      ];

      // Câu lệnh query
      const queryString =
        "INSERT INTO employees(EmployeeId, EmployeeCode,EmployeeName,DateOfBirth,Gender,DepartmentId,IdentityNumber,DateRange,Position,IssuedBy,Address,PhoneNumber,Password,Email,BankNumber,BankName,BankBranch,CreatedDate, CreatedBy, ModifiedDate,ModifiedBy ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      database.query(queryString, newUser, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            devMessage: err,
          });
        } else {
          return res.status(201).json({
            status: 201,
            message: "Thêm mới thành công",
          });
        }
      });
    }
  });
});

// API đăng nhập
route.post("/login", (req, res) => {
  // Lấy Email và Password từ client
  const { Email, Password } = req.body;
  // Kiểm tra email có tồn tại trong dc?
  const query = "SELECT * FROM employees WHERE Email = ?";
  database.query(query, [Email], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMessage: err,
      });
    } else {
      if (result.length > 0) {
        const user = result[0];
        // Giải mã password
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              devMessage: err,
            });
          } else {
            if (!isMatch) {
              return res.status(401).json({
                status: 401,
                userMessage: "Mật khẩu nhập vào không đúng",
              });
            } else {
              return res.status(200).json({
                status: 200,
                message: "Đăng nhập thành công",
                data: user,
              });
            }
          }
        });
      }
    }
  });
});

// Cập nhật thông tin employees
route.put("/:id", checkDataEmpty, validateEmail, (req, res) => {
  const { id } = req.params;
  // Lấy dữ liệu dưới body
  const {
    EmployeeCode,
    EmployeeName,
    DateOfBirth,
    Gender,
    DepartmentId,
    IdentityNumber,
    DateRange,
    Position,
    IssuedBy,
    Address,
    PhoneNumber,
    Email,
    BankNumber,
    BankName,
    BankBranch,
    ModifiedDate,
    ModifiedBy,
  } = req.body;

  const newDateOfBirth = FORMATDATERERVESE(DateOfBirth);
  const newDateRange = FORMATDATERERVESE(DateRange);
  const newModifiedDate = FORMATDATERERVESE(ModifiedDate);

  const newUser = [
    EmployeeCode,
    EmployeeName,
    newDateOfBirth,
    Gender,
    DepartmentId,
    IdentityNumber,
    newDateRange,
    Position,
    IssuedBy,
    Address,
    PhoneNumber,
    Email,
    BankNumber,
    BankName,
    BankBranch,
    newModifiedDate,
    ModifiedBy,
    id,
  ];

  // Câu lệnh query
  const queryString =
    "UPDATE employees SET EmployeeCode = ?, EmployeeName = ?, DateOfBirth = ? , Gender = ?, DepartmentId = ?, IdentityNumber = ?, DateRange = ?, Position = ?, IssuedBy = ?, Address = ?, PhoneNumber = ?, Email = ?, BankNumber = ?, BankName = ?, BankBranch = ?, ModifiedDate = ?, ModifiedBy = ? WHERE EmployeeId = ? ";

  database.query(queryString, newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMessage: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Cập nhật thông tin thành công",
      });
    }
  });
});

module.exports = route;
