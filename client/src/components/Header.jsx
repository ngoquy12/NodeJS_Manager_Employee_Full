import React from "react";

export default function Header() {
  return (
    <>
      <div className="m-navbar">
        <div className="m-navbar-left">
          <div className="m-navbar-icon m-icon-24 m-icon-three-stripes" />
          <div className="m-navbar-branch">
            <div className="m-branch-name">
              CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ
            </div>
            <div className="m-navbar-icon m-icon-14 m-icon-chevron-down-bold" />
          </div>
        </div>
        <div className="m-navbar-right">
          <div
            className="m-navbar-icon m-icon-24 m-icon-bell"
            title="Thông báo"
          />
          <div className="m-navbar-user">
            <div className="m-user-image">
              <img src="./assets/img/default-avatar.jpg" alt="User image" />
            </div>
            <div className="m-user-name">Ngọ Văn Quý</div>
            <div className="m-navbar-icon m-icon-14 m-icon-chevron-down" />
          </div>
        </div>
      </div>
    </>
  );
}
