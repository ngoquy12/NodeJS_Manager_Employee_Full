import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ManagerUser from "./components/page/ManagerUser";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import NotFound from "./components/page/NotFound";
import Login from "./components/page/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manager-user" element={<ManagerUser />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
