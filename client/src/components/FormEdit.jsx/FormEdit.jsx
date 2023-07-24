import axios from "axios";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { FORMATDATE, FORMATDATERERVESE } from "./../../formatData/formatDate";

export default function FormEdit({ idEdit, handleCloseEdit, loadData }) {
  const [close, setClose] = useState(false);
  const [departments, setDepartments] = useState([]);

  // Khởi tạo đối tượng employee
  const [employee, setEmployee] = useState({
    EmployeeCode: "",
    EmployeeName: "",
    DateOfBirth: "",
    Gender: 0,
    DepartmentId: "",
    IdentityNumber: "",
    DateRange: "",
    Position: "",
    Password: "",
    IssuedBy: "",
    Address: "",
    PhoneNumber: "",
    PhoneFixed: "",
    BankNumber: "",
    BankName: "",
    BankBranch: "",
    Email: "",
    ModifiedDate: FORMATDATE(new Date()),
    ModifiedBy: "Ngọ Văn Sửu",
  });

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
    Password,
    Address,
    PhoneNumber,
    BankNumber,
    BankName,
    BankBranch,
    Email,
  } = employee;

  // Lắng nghe sự thay đổi giá trị trong các ô input và radio
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio" && name === "Gender") {
      // Nếu là ô radio giới tính, sử dụng parseInt để chuyển giá trị về số nguyên
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        Gender: parseInt(value, 10), //10: Đây là hệ cơ số mà bạn muốn sử dụng để phân tích chuỗi. Trong trường hợp này, hệ cơ số 10 đại diện cho hệ thập phân, tức là các con số từ 0 đến 9.
      }));
    } else {
      // Nếu là các ô input thông thường thì giữ nguyên giá trị trong state employee
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  // Gọi API lấy thông tin tất cả phòng ban
  const getAllDepartment = () => {
    axios
      .get("http://localhost:8080/api/v1/departments")
      .then((res) => setDepartments(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllDepartment();
  }, []);

  // Danh sách giới tính
  const genders = [
    {
      id: 0,
      value: 0,
      title: "Nam",
    },
    {
      id: 1,
      value: 1,
      title: "Nữ",
    },
    {
      id: 2,
      value: 2,
      title: "Khác",
    },
  ];

  // API lấy thông tin một employee theo Id
  const getById = () => {
    axios
      .get(`http://localhost:8080/api/v1/employees/${idEdit}`)
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getById();
  }, []);

  // Đóng form edit
  const handleCloseForm = () => {
    handleCloseEdit(close);
  };

  // Handle Submit
  const handleSubmit = () => {
    axios
      .put(`http://localhost:8080/api/v1/employees/${idEdit}`, employee)
      .then((res) => {
        if (res.data.status === 200) {
          // Đóng form
          handleCloseForm();
          notification.success({
            message: res.data.message,
          });
          //load lại data
          loadData();
        }
      })
      .catch((err) => {
        if (err.response.data.status === 400) {
          notification.error({
            message: err.response.data.message,
          });
        }
      });
  };

  return (
    <>
      <div className="m-popup m-add-popup ">
        <div className="m-popup-con">
          <div className="m-popup-background" />
          <div className="m-popup-drag">
            <div className="m-popup m-popup-content">
              <div className="m-popup--header">
                <div className="m-popup--title">
                  <div className="m-title m-title-content">
                    Thông tin nhân viên
                  </div>
                  <label className="m-popup-checkbox">
                    <input type="checkbox" className="m-input-checkbox-popup" />
                    <span className="m-checkbox">
                      <span className="m-checkbox-inner">
                        <div className="m-icon-16 m-icon-checkbox-active" />
                      </span>
                    </span>
                    <span className="m-input-checkbox-label">
                      Là khách hàng
                    </span>
                  </label>
                  <label className="m-popup-checkbox">
                    <input type="checkbox" className="m-input-checkbox-popup" />
                    <span className="m-checkbox">
                      <span className="m-checkbox-inner">
                        <div className="m-icon-16 m-icon-checkbox-active" />
                      </span>
                    </span>
                    <span className="m-input-checkbox-label">
                      Là nhà cung cấp
                    </span>
                  </label>
                </div>
                <div className="m-popup--close">
                  <div
                    className="m-icon-24 m-icon-help"
                    style={{ marginRight: 6 }}
                    title="Trợ giúp"
                  />
                  <div
                    className="m-icon-24 m-icon-close m-close-add-popup"
                    title="Đóng(ESC)"
                    value={close}
                    onClick={handleCloseForm}
                  />
                </div>
              </div>
              <div className="m-popup--content">
                <div className="m-popup--content-scroll">
                  <form id="employeeForm">
                    <div className="m-content-2-col">
                      <div className="m-col-1 m-flex-wrap">
                        <div className="m-input-40 m-pr-6 m-pb-24">
                          <div className="m-flex">
                            <div className="m-input-title">Mã</div>
                            <div className="m-input-title-require">&nbsp;*</div>
                          </div>
                          <input
                            type="text"
                            className="m-input m-input-require m-input-code"
                            value={EmployeeCode}
                            onChange={(e) => handleChange(e)}
                            name="EmployeeCode"
                            maxLength={25}
                            propname="EmployeeCode"
                            tabIndex={1}
                          />
                          <div className="m-input-message-error">
                            &lt;Mã&gt;không được để trống
                          </div>
                        </div>
                        <div className="m-input-60 m-pb-24">
                          <div className="m-flex">
                            <div className="m-input-title">Tên</div>
                            <div className="m-input-title-require">&nbsp;*</div>
                          </div>
                          <input
                            type="text"
                            className="m-input m-input-require"
                            value={EmployeeName}
                            onChange={(e) => handleChange(e)}
                            name="EmployeeName"
                            maxLength={128}
                            tabIndex={2}
                          />
                          <div className="m-input-message-error">
                            &lt;Tên&gt;không được để trống
                          </div>
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex">
                            <div className="m-input-title">Đơn vị</div>
                            <div className="m-input-title-require">&nbsp;*</div>
                          </div>
                          <div className="m-combo-box">
                            <select
                              name="DepartmentId"
                              className="m-input"
                              onChange={(e) => handleChange(e)}
                              value={DepartmentId}
                            >
                              {departments.map((dep) => (
                                <option
                                  value={dep.DepartmentId}
                                  key={dep.DepartmentId}
                                >
                                  {dep.DepartmentName}
                                </option>
                              ))}
                            </select>
                            <div className="m-input-message-error">
                              &lt;Đơn vị&gt;không được để trống
                            </div>
                          </div>
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Chức danh</div>
                          </div>
                          <input
                            type="text"
                            className="m-input"
                            name="Position"
                            value={Position}
                            onChange={(e) => handleChange(e)}
                            maxLength={128}
                            propname="Position"
                            tabIndex={10}
                          />
                        </div>
                      </div>
                      <div className="m-col-2 m-flex-wrap">
                        <div className="m-input-40 m-pr-6 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Ngày sinh</div>
                          </div>
                          <input
                            type="date"
                            value={FORMATDATERERVESE(DateOfBirth)}
                            onChange={(e) => handleChange(e)}
                            className="m-input"
                            name="DateOfBirth"
                            tabIndex={3}
                          />
                        </div>
                        <div className="m-input-60 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title m-input-title-gender">
                              Giới tính
                            </div>
                          </div>
                          <div className="m-radio-group">
                            {genders.map((gend) => (
                              <label className="m-con-radio">
                                <input
                                  type="radio"
                                  className="m-input-radio"
                                  checked={gend.value === Gender}
                                  onChange={handleChange}
                                  name="Gender"
                                  value={gend.value}
                                  tabIndex={4}
                                />
                                <span className="m-radio">
                                  <span className="m-radio-border" />
                                  <span className="m-radio-circle" />
                                </span>
                                <span className="m-radio-label">
                                  {gend.title}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="m-input-60 m-pr-6 m-pb-24">
                          <div className="m-flex-wrap">
                            <div
                              className="m-input-title"
                              title="Số chứng minh nhân dân"
                            >
                              Số CMND
                            </div>
                          </div>
                          <input
                            type="text"
                            className="m-input"
                            name="IdentityNumber"
                            maxLength={20}
                            value={IdentityNumber}
                            onChange={(e) => handleChange()}
                            tabIndex={8}
                          />
                        </div>
                        <div className="m-input-40 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Ngày cấp</div>
                          </div>
                          <input
                            type="date"
                            value={FORMATDATERERVESE(DateRange)}
                            onChange={(e) => handleChange(e)}
                            className="m-input"
                            name="DateRange"
                            tabIndex={9}
                          />
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Nơi cấp</div>
                          </div>
                          <input
                            type="text"
                            className="m-input"
                            value={IssuedBy}
                            onChange={(e) => handleChange()}
                            name="IssuedBy"
                            tabIndex={11}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="m-content-1-col m-pb-24">
                      <div className="m-input-100">
                        <div className="m-flex-wrap">
                          <div className="m-input-title">Địa chỉ</div>
                        </div>
                        <input
                          type="text"
                          value={Address}
                          onChange={(e) => handleChange(e)}
                          className="m-input"
                          name="Address"
                          propname="Address"
                          tabIndex={12}
                        />
                      </div>
                    </div>
                    <div className="m-content-4-col">
                      <div className="m-col-1 m-pr-6">
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div
                              className="m-input-title"
                              title="Điện thọai di động"
                            >
                              ĐT di động
                            </div>
                          </div>
                          <input
                            type="text"
                            className="m-input"
                            value={PhoneNumber}
                            onChange={(e) => handleChange(e)}
                            name="PhoneNumber"
                            tabIndex={13}
                          />
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">
                              Tài khoản ngân hàng
                            </div>
                          </div>
                          <input
                            value={BankNumber}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="m-input"
                            name="BankNumber"
                            tabIndex={16}
                          />
                        </div>
                      </div>
                      <div className="m-col-2 m-pr-6">
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Mật khẩu</div>
                          </div>
                          <input
                            value={Password}
                            onChange={(e) => handleChange(e)}
                            className="m-input"
                            readOnly={true}
                            name="Password"
                            type="password"
                            tabIndex={14}
                          />
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Tên ngân hàng</div>
                          </div>
                          <input
                            type="text"
                            className="m-input"
                            value={BankName}
                            onChange={(e) => handleChange(e)}
                            name="BankName"
                            tabIndex={17}
                          />
                        </div>
                      </div>
                      <div className="m-col-3 m-pr-6">
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Email</div>
                          </div>
                          <input
                            type="text"
                            value={Email}
                            onChange={(e) => handleChange(e)}
                            className="m-input"
                            name="Email"
                            tabIndex={15}
                          />
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Chi nhánh</div>
                          </div>
                          <input
                            type="text"
                            value={BankBranch}
                            onChange={(e) => handleChange(e)}
                            className="m-input"
                            name="BankBranch"
                            tabIndex={18}
                          />
                        </div>
                      </div>
                      <div className="m-col-4" />
                    </div>
                  </form>
                </div>
                <div className="m-popup--footer">
                  <div className="m-divine" />
                  <div className="m-popup-btn">
                    <div className="m-popup-btn-left">
                      <button
                        className="m-button m-button-secondary m-button-size-default m-button-border-false m-button-close"
                        tabIndex={21}
                        id="m-button-close "
                      >
                        <div className="m-button-text">Hủy</div>
                      </button>
                    </div>
                    <div className="m-popup-btn-right">
                      <button
                        onClick={handleSubmit}
                        className="m-button m-button-size-default m-button-border-false m-popup-store-and-add-btn"
                        tabIndex={19}
                      >
                        <div className="m-button-text">Lưu</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
