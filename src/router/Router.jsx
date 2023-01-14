import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Boards from "../pages/Boards";
import BoardDetail from "../pages/BoardDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetail />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
