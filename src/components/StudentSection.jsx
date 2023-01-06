import React from "react";
import AbsentStudent from "./AbsentStudent";
import AllStudent from "./AllStudent";
import PresentStudent from "./PresentStudent";
import "../App.css";
const StudentSection = () => {
  return (
    <div className="student-section">
      <AllStudent />
      <PresentStudent />
      <AbsentStudent />
    </div>
  );
};

export default StudentSection;
