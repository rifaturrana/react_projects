import { BrowserRouter, Route, Routes } from "react-router-dom";
import Component1 from "../components/Component1";
import Component2 from "../components/Component2";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component1 />} />
        <Route path="/demo" element={<Component2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
