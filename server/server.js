const express = require("express");
const app = express();
const employeeRouter = require("./routes/employee.routes");
const departmentRouter = require("./routes/department.routes");

app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/departments", departmentRouter);

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
