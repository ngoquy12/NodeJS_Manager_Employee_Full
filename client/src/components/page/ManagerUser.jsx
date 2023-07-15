import React, { useState } from "react";
import Form from "../Form";

export default function Content() {
  const [showForm, setShowForm] = useState(false);

  // Hiện form
  const handleShow = () => {
    setShowForm(true);
  };

  // lifting state
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
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
                />
                <div
                  className="m-icon-after m-icon-16 m-icon-search"
                  title="Tìm kiếm"
                />
              </div>
              <div
                className="m-refresh-button m-icon-24 m-icon-refresh"
                title="Lấy lại dữ liệu"
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
                  <td className="m-td m-td-emp-code">NV001</td>
                  <td className="m-td">NVQUY</td>
                  <td className="m-td">Nam</td>
                  <td className="m-td" style={{ textAlign: "center" }}>
                    20/11/2023
                  </td>
                  <td className="m-td">Quan ly</td>
                  <td className="m-td">0987</td>
                  <td className="m-td">Quan ly</td>
                  <td className="m-td">000875678</td>
                  <td className="m-td">BIDV</td>
                  <td className="m-td">ABC</td>
                  <td className="m-td">NVF</td>
                  <td className="m-td m-td-widget">
                    <div className="m-dropdown">
                      <button className="m-dropdown-type-feature m-dropdown-btn-text m-edit-employee">
                        <div className="m-btn-text">Sửa</div>
                      </button>
                      <button className="m-dropdown-type-feature m-dropdown-btn-icon m-dropdown-icon-emp">
                        <div className="m-btn-text">
                          <div className="m-icon-16 m-icon-arrow-down-blue"></div>
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Thanh phân trang */}
          <div className="m-pagination">
            <div className="m-pagination-left">
              <div className="m-total-record">
                Tổng số: <b className="m-total" /> bản ghi
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
                        autofocus="autofocus"
                        defaultValue="10 bản ghi trên 1 trang"
                      />
                    </div>
                    <div className="m-combo-action m-select-record">
                      <div className="m-btn-dropdown">
                        <div className="m-icon-16 m-icon-arrow-dropdown m-dropdown-close" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-page-number">
                <div className="m-prev-page">Trước</div>
                <div className="m-page-index" />
                <div className="m-next-page">Sau</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
