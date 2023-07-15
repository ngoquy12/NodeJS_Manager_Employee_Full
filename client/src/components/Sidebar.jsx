import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="m-menu">
        <div className="m-logo-container">
          <div className="m-option-icon" />
          <img
            className="m-logo-icon"
            src="http://pluspng.com/img-png/favicon-png-favicon-1024.png"
            alt="Logo_Module_TiengViet_White"
          />
        </div>
        <div className="m-menu-item">
          <div className="m-tooltip-content">
            <NavLink to="/" className="m-item-router" title="Trang chủ">
              <div className="m-item-icon m-icon-24 m-icon-dashboard" />
              <div className="m-item-title">Tổng quan</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <NavLink
              to="manager-user"
              className="m-item-router"
              title="Nhân viên"
            >
              <div className="m-item-icon m-icon-24 m-icon-cash" />
              <div className="m-item-title">Nhân viên</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Tiền gửi">
              <div className="m-item-icon m-icon-24 m-icon-bank" />
              <div className="m-item-title">Tiền gửi</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Mua hàng">
              <div className="m-item-icon m-icon-24 m-icon-buy" />
              <div className="m-item-title">Mua hàng</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Bán hàng">
              <div className="m-item-icon m-icon-24 m-icon-sale" />
              <div className="m-item-title">Bán hàng</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Quản lý đơn hàng">
              <div className="m-item-icon m-icon-24 m-icon-invoice" />
              <div className="m-item-title">Quản lý hóa đơn</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Kho">
              <div className="m-item-icon m-icon-24 m-icon-stock" />
              <div className="m-item-title">Kho</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Công cụ dụng cụ">
              <div className="m-item-icon m-icon-24 m-icon-tools" />
              <div className="m-item-title">Công cụ dụng cụ</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Tài sản cố định">
              <div className="m-item-icon m-icon-24 m-icon-fixed-assets" />
              <div className="m-item-title">Tài sản cố định</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Thuế">
              <div className="m-item-icon m-icon-24 m-icon-tax" />
              <div className="m-item-title">Thuế</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Giá thành">
              <div className="m-item-icon m-icon-24 m-icon-price" />
              <div className="m-item-title">Giá thành</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Tổng hợp">
              <div className="m-item-icon m-icon-24 m-icon-general" />
              <div className="m-item-title">Tổng hợp</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Ngân sách">
              <div className="m-item-icon m-icon-24 m-icon-budget" />
              <div className="m-item-title">Ngân sách</div>
            </a>
          </div>
          <div className="m-tooltip-content">
            <a href="#" className="m-item-router" title="Báo cáo">
              <div className="m-item-icon m-icon-24 m-icon-report" />
              <div className="m-item-title">Báo cáo</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
