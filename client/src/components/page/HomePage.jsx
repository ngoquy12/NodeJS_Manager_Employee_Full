import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function HomePage() {
  return (
    <div>
      <div className="m-container">
        <Sidebar />
        <div className="m-content">
          <Header />
        </div>
        Home
      </div>
    </div>
  );
}
