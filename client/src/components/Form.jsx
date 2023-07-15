import React, { useState } from "react";

export default function Form({ handleClose }) {
  const [close, setClose] = useState(false);

  // Đóng form truyền xuống component chacha
  const handleCloseParent = () => {
    setClose(handleClose);
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
                            <div className="m-combo-main-content m-input-error">
                              <div className="m-selected-options">
                                <input
                                  type="hidden"
                                  name="DepartmentId"
                                  propname="DepartmentId"
                                />
                                <input
                                  type="text"
                                  className="m-combo-input"
                                  required=""
                                  name="DepartmentName"
                                  propname="DepartmentName"
                                  tabIndex={7}
                                />
                              </div>
                              <div className="m-combo-action m-select-department">
                                <div className="m-btn-dropdown">
                                  <div className="m-icon-16 m-icon-arrow-dropdown" />
                                </div>
                              </div>
                            </div>
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
                            <label className="m-con-radio">
                              <input
                                type="radio"
                                className="m-input-radio"
                                defaultValue={0}
                                name="Gender"
                                defaultChecked=""
                                tabIndex={4}
                              />
                              <span className="m-radio">
                                <span className="m-radio-border" />
                                <span className="m-radio-circle" />
                              </span>
                              <span className="m-radio-label">Nam</span>
                            </label>
                            <label className="m-con-radio">
                              <input
                                type="radio"
                                className="m-input-radio"
                                defaultValue={1}
                                name="Gender"
                                tabIndex={5}
                              />
                              <span className="m-radio">
                                <span className="m-radio-border" />
                                <span className="m-radio-circle" />
                              </span>
                              <span className="m-radio-label">Nữ</span>
                            </label>
                            <label className="m-con-radio">
                              <input
                                type="radio"
                                className="m-input-radio"
                                defaultValue={2}
                                name="Gender"
                                tabIndex={6}
                              />
                              <span className="m-radio">
                                <span className="m-radio-border" />
                                <span className="m-radio-circle" />
                              </span>
                              <span className="m-radio-label">Khác</span>
                            </label>
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
                              ĐT cố định
                            </div>
                          </div>
                          <input
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
                        className="m-button m-button-secondary m-button-size-default m-button-border-false m-popup-store-btn"
                        tabIndex={20}
                      >
                        <div className="m-button-text">Cất</div>
                      </button>
                      <button
                        className="m-button m-button-size-default m-button-border-false m-popup-store-and-add-btn"
                        tabIndex={19}
                      >
                        <div className="m-button-text">Cất và thêm</div>
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
