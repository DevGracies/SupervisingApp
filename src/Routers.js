import React, { useState } from "react";
import LoginPage from "./component/LoginPage/LoginPage";
import { Link, Route, Routes } from "react-router-dom";
import Join from "./Screen/Join";
import ProtectedRouters from "./component/LoginPage/ProtectedRouters";
import Error from "./Screen/Error";
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
        <Route element={<ProtectedRouters />}>
          <Route path="/join" element={<Join />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
