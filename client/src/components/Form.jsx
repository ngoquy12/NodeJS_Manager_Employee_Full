import axios from "axios";
import React, { useEffect, useState } from "react";
import { notification } from "antd";

export default function Form({ handleClose, loadData }) {
  const [close, setClose] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(0);
  const [department, setDepartment] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [position, setPosition] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [email, setEmail] = useState("");

  // Đóng form truyền xuống component chacha
  const handleCloseParent = () => {
    setClose(handleClose);
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

  // Handle Submit
  const handleSubmit = () => {
    // Lấy thông tin newUser
    const newUser = {
      EmployeeCode: employeeCode,
      EmployeeName: employeeName,
      DateOfBirth: dateOfBirth,
      Gender: gender,
      DepartmentId: department,
      IdentityNumber: identityNumber,
      DateRange: dateRange,
      Position: position,
      IssuedBy: issuedBy,
      Address: address,
      PhoneNumber: phoneNumber,
      Password: password,
      Email: email,
      BankNumber: bankNumber,
      BankName: bankName,
      BankBranch: bankBranch,
      CreatedDate: new Date(),
      CreatedBy: "Ngọ Văn Quý",
      ModifiedDate: new Date(),
      ModifiedBy: "Ngọ Văn Quý",
    };

    axios
      .post("http://localhost:8080/api/v1/employees", newUser)
      .then((res) => {
        if (res.data.status === 201) {
          // Đóng form
          handleCloseParent();
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
                    onClick={handleCloseParent}
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
                            required=""
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
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
                            required=""
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            name="EmployeeName"
                            maxLength={128}
                            propname="EmployeeName"
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
                              name=""
                              id=""
                              className="m-input"
                              onChange={(e) => setDepartment(e.target.value)}
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
                            name="EmployeePosition"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            maxLength={128}
                            propname="EmployeePosition"
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
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="m-input"
                            name="DateOfBirth"
                            propname="DateOfBirth"
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
                                  checked={gend.id === gender}
                                  onChange={() => setGender(gend.id)}
                                  name="Gender"
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
                            value={identityNumber}
                            onChange={(e) => setIdentityNumber(e.target.value)}
                            propname="IdentityNumber"
                            tabIndex={8}
                          />
                        </div>
                        <div className="m-input-40 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Ngày cấp</div>
                          </div>
                          <input
                            type="date"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="m-input"
                            name="IdentityDate"
                            propname="IdentityDate"
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
                            value={issuedBy}
                            onChange={(e) => setIssuedBy(e.target.value)}
                            name="IdentityPlace"
                            propname="IdentityPlace"
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
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            name="TelephoneNumber"
                            propname="TelephoneNumber"
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
                            value={bankNumber}
                            onChange={(e) => setBankNumber(e.target.value)}
                            type="text"
                            className="m-input"
                            name="BankAccountNumber"
                            propname="BankAccountNumber"
                            tabIndex={16}
                          />
                        </div>
                      </div>
                      <div className="m-col-2 m-pr-6">
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div
                              className="m-input-title"
                              title="Điện thoại cố định"
                            >
                              Mật khẩu
                            </div>
                          </div>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            className="m-input"
                            name="PhoneNumber"
                            propname="PhoneNumber"
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
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            name="BankName"
                            propname="BankName"
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
                            id="m-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="m-input"
                            name="Email"
                            propname="Email"
                            tabIndex={15}
                            isemail=""
                          />
                        </div>
                        <div className="m-input-100 m-pb-24">
                          <div className="m-flex-wrap">
                            <div className="m-input-title">Chi nhánh</div>
                          </div>
                          <input
                            type="text"
                            value={bankBranch}
                            onChange={(e) => setBankBranch(e.target.value)}
                            className="m-input"
                            name="BankBranchName"
                            propname="BankBranchName"
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
