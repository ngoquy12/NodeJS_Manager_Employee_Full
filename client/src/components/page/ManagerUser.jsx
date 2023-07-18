import React, { useEffect, useState } from "react";
import Form from "../Form";
import axios from "axios";
import { FORMATDATE } from "../../formatData/formatDate";
import Loading from "./../base/Loading";

export default function Content() {
  const [showForm, setShowForm] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [toggleRecord, setToggleRecord] = useState(false);
  const [recordId, setRecordId] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [curentpage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [top, setTop] = useState(0);
  const [right, setRight] = useState(0);
  const [employeeID, setEmployeeID] = useState(0);
  const [optionDelete, setOptionDelete] = useState(false);

  console.log("id cần xóa", employeeID);

  console.log("totalPage", totalPage);

  console.log("pageSize", pageSize);

  // Số lượng bản ghi muốn lấy
  const listRecord = [
    {
      id: 1,
      value: 10,
    },
    {
      id: 2,
      value: 20,
    },
    {
      id: 3,
      value: 30,
    },
    {
      id: 4,
      value: 50,
    },
    {
      id: 5,
      value: 100,
    },
  ];

  // Lấy value của record
  const getRecord = (recId, recValue) => {
    setRecordId(recId); // Lấy id của record
    setToggleRecord(false); // Ẩn option
    setPageSize(recValue);
  };

  // Hiện form
  const handleShow = () => {
    setShowForm(true);
  };

  // lifting state
  const handleClose = () => {
    setShowForm(false);
  };

  // load data
  const loadData = () => {
    setLoading(true);
    // Call API
    axios
      .get(
        `http://localhost:8080/api/v1/employees?nameSearch=${nameSearch}&limit=${pageSize}&offset=${curentpage}`
      )
      .then((res) => {
        setListEmployee(res.data.data);
        setTotalRecord(res.data.totalResult);
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [nameSearch, pageSize, curentpage]);

  // Lấy vị trí bản ghi cần xóa
  const getPosition = (e, employeeId) => {
    setRight(e.clientX);
    setTop(e.clientY);
    setEmployeeID(employeeId);
    setOptionDelete(!optionDelete);
  };

  // Xác định vị trí của box delete
  let featurePosition = {
    top: `${top - 54}px`,
    right: `${-25}px`,
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      {/* Hiện thị form */}
      {showForm ? <Form handleClose={handleClose} /> : <></>}
      <div className="m-main-content">
        <div className="m-content-header">
          <div className="m-header-title">Nhân viên</div>
          <button
            className="m-button m-button-add-emp"
            title="(Insert)"
            onClick={handleShow}
          >
            <div className="m-button-text">Thêm mới nhân viên</div>
          </button>
        </div>
        {/* toolbar */}
        <div className="m-content-body">
          <div className="m-body-toolbar">
            <div className="m-body-toolbar-left">
              <button id="m-input-delete" className="m-button" disabled="">
                <div className="m-button-text">Xóa</div>
              </button>
            </div>
            <div className="m-body-toolbar-right">
              <div className="m-search-area">
                <input
                  type="text"
                  className="m-input m-input-icon m-input-search m-search-emp"
                  placeholder="Tìm theo mã, tên nhân viên"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
                <div
                  className="m-icon-after m-icon-16 m-icon-search"
                  title="Tìm kiếm"
                />
              </div>
              <div
                className="m-refresh-button m-icon-24 m-icon-refresh"
                title="Lấy lại dữ liệu"
                onClick={loadData}
              />
            </div>
          </div>
          <div className="m-body-table">
            <table className="m-table">
              <thead className="m-thead">
                <tr className="m-tr">
                  <th className="m-th m-checkall">
                    <label className="m-table-checkbox">
                      <input type="checkbox" className="m-input-checkall" />
                      <span className="m-checkbox">
                        <span className="m-checkbox-inner">
                          <div className="m-icon-16 m-icon-checkbox-active" />
                        </span>
                      </span>
                    </label>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 143, width: 143 }}
                  >
                    <div className="m-th-title">Mã nhân viên</div>
                  </th>
                  <th className="m-th m-dynamic-col" style={{ minWidth: 173 }}>
                    <div className="m-th-title">Tên nhân viên</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 120, width: 120 }}
                  >
                    <div className="m-th-title">Giới tính</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 145, width: 145 }}
                  >
                    <div className="m-th-title m-th-title-dob">Ngày sinh</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 200, width: 200 }}
                  >
                    <div className="m-th-title" title="Số chứng minh nhân dân">
                      Số CMND
                    </div>
                  </th>
                  <th
                    className="m-th m-dynamoc-col"
                    style={{ minWidth: 122, width: 122 }}
                  >
                    <div className="m-th-title">Chức danh</div>
                  </th>
                  <th className="m-th m-dynamic-col" style={{ minWidth: 250 }}>
                    <div className="m-th-title">Tên đơn vị</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 150, width: 150 }}
                  >
                    <div className="m-th-title">Số tài khoản</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 250, width: 250 }}
                  >
                    <div className="m-th-title">Tên ngân hàng</div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 250, width: 250 }}
                  >
                    <div
                      className="m-th-title"
                      title="Chi nhánh tài khoản ngân hàng"
                    >
                      Chi nhánh TK ngân hàng
                    </div>
                  </th>
                  <th
                    className="m-th m-dynamic-col"
                    style={{ minWidth: 250, width: 250 }}
                  >
                    <div className="m-th-title">Chi nhánh</div>
                  </th>
                  <th
                    className="m-th m-th-widget"
                    style={{ width: 120, minWidth: 120 }}
                  >
                    <div className="m-th-title">Chức năng</div>
                  </th>
                </tr>
              </thead>
              <tbody className="m-tbody">
                {/* Dữ liệu cảu bảng sẽ được hiển thị ở đây sau khi append dữ liệu từ api */}
                {listEmployee.map((emp) => (
                  <tr className="m-tr">
                    <td className="m-td m-td-multi">
                      <label className="m-table-checkbox">
                        <input type="checkbox" className="m-input-checkbox" />
                        <span className="m-checkbox">
                          <span className="m-checkbox-inner">
                            <div className="m-icon-16 m-icon-checkbox-active"></div>
                          </span>
                        </span>
                      </label>
                    </td>
                    <td className="m-td m-td-emp-code">{emp.EmployeeCode}</td>
                    <td className="m-td">{emp.EmployeeName}</td>
                    <td className="m-td">
                      {emp.Gender === 0
                        ? "Nam"
                        : emp.Gender === 1
                        ? "Nữ"
                        : "Khác"}
                    </td>
                    <td className="m-td" style={{ textAlign: "center" }}>
                      {FORMATDATE(emp.DateOfBirth)}
                    </td>
                    <td className="m-td">{emp.IdentityNumber}</td>
                    <td className="m-td">{emp.Position}</td>
                    <td className="m-td">{emp.DepartmentName}</td>
                    <td className="m-td">000875678</td>
                    <td className="m-td">BIDV</td>
                    <td className="m-td">ABC</td>
                    <td className="m-td">NVF</td>
                    <td className="m-td m-td-widget">
                      <div className="m-dropdown">
                        <button className="m-dropdown-type-feature m-dropdown-btn-text m-edit-employee">
                          <div className="m-btn-text">Sửa</div>
                        </button>
                        <button
                          style={{ position: "relative" }}
                          onClick={(e) => getPosition(e, emp.EmployeeId)}
                          className="m-dropdown-type-feature m-dropdown-btn-icon m-dropdown-icon-emp"
                        >
                          <div className="m-btn-text">
                            <div className="m-icon-16 m-icon-arrow-down-blue"></div>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Dropdown menu xóa nhân viên */}
          {optionDelete ? (
            <>
              <div
                class="m-dropdown-menu m-dropdown-emp"
                style={featurePosition}
              >
                <ul class="m-dropdown-menu-items">
                  <li class="m-dropdown-item">
                    <a class="m-dropdown-item-link">Nhân bản</a>
                  </li>
                  <li class="m-dropdown-item m-item-delete">
                    <a class="m-dropdown-item-link">Xóa</a>
                  </li>
                  <li class="m-dropdown-item">
                    <a class="m-dropdown-item-link">Ngừng sử dụng</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* Thanh phân trang */}
          <div className="m-pagination">
            <div className="m-pagination-left">
              <div className="m-total-record">
                Tổng số: <b className="m-total">{totalRecord}</b> bản ghi
              </div>
            </div>
            <div className="m-pagination-right">
              <div className="m-record-in-page">
                <div className="m-combo-box">
                  <div className="m-combo-main-content">
                    <div className="m-selected-options">
                      <input
                        type="text"
                        className="m-combo-input"
                        readOnly="true"
                        placeholder={`${pageSize} bản ghi trên 1 trang`}
                      />
                    </div>
                    <div
                      className="m-combo-action m-select-record"
                      onClick={() => setToggleRecord(!toggleRecord)}
                    >
                      <div className="m-btn-dropdown">
                        <div
                          className={`m-icon-16 m-icon-arrow-dropdown ${
                            toggleRecord
                              ? "m-dropdown-close"
                              : "m-dropdown-open"
                          }  `}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Combo dropdown chọn số bản ghi  */}
                  {toggleRecord ? (
                    <div className="m-combo-dropdown-panel">
                      <div className="m-dropdown-body-container">
                        <ul className="m-combo-dropdown-items">
                          {listRecord.map((record) => (
                            <li
                              onClick={() => getRecord(record.id, record.value)}
                              className={`m-combo-box-item ${
                                recordId === record.id ? "m-item-highlight" : ""
                              } `}
                            >
                              {record.value} bản ghi trên 1 trang
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="m-page-number">
                <div
                  className={`m-prev-page ${
                    curentpage === 1 ? "m-disable" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(curentpage - 1);
                  }}
                >
                  Trước
                </div>
                <div
                  className="m-page-index "
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </div>
                <div className="m-page-index m-number">
                  {curentpage >= 1 ? curentpage + 1 : 2}
                </div>
                <div className="m-page-index m-number">...</div>
                <div
                  className="m-page-index"
                  onClick={() => {
                    curentpage > 1 ? setCurrentPage(totalPage) : null;
                  }}
                >
                  {totalPage}
                </div>
                <div
                  className={`m-next-page ${
                    curentpage === totalPage ? "m-disable" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(curentpage + 1);
                  }}
                >
                  Sau
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
