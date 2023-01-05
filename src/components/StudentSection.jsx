import React from "react";
import AbsentStudent from "./AbsentStudent";
import AllStudent from "./AllStudent";
import PresentStudent from "./PresentStudent";
import "../App.css";
import { useContext } from "react";
import { StudentContext } from "../contexts/Student";
const StudentSection = () => {
  const { students, setStudents } = useContext(StudentContext);
  const toggleHandler = (id) => {
    const newStudentList = students.map((item) => {
      if (item.id === id) {
        item.isPresent = !item.isPresent; // !true === false // !false === true
      }

      return item;
    });

    setStudents(newStudentList);
  };
  return (
    <div className="student-section">
      <AllStudent />
      <PresentStudent toggleHandler={toggleHandler} />
      <AbsentStudent toggleHandler={toggleHandler} />
    </div>
  );
};

export default StudentSection;
