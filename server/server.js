const express = require("express");
const app = express();
const employeeRouter = require("./routes/employee.routes");

app.use("/api/v1/employees", employeeRouter);

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
