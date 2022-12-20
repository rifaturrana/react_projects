import React from "react";
import AllStudents from "./AllStudents";
import PresentStudents from "./PresentStudents";
import AbsentStudents from "./AbsentStudents";
const StudentSection = (props) => {
  const {
    students,
    setStudents,
    setEditMode,
    setEditableStudent,
    setStudentName,
  } = props;

  const toggleHandler = (id) => {
    const toggleStudent = students.map((s) => {
      if (s.id === id) {
        s.isPresent = !s.isPresent;
      }
      return s;
    });
    setStudents(toggleStudent);
  };

  return (
    <div className="student-section">
      <AllStudents
        students={students}
        setStudents={setStudents}
        setEditMode={setEditMode}
        setEditableStudent={setEditableStudent}
        setStudentName={setStudentName}
      />
      <PresentStudents toggleHandler={toggleHandler} students={students} />
      <AbsentStudents toggleHandler={toggleHandler} students={students} />
    </div>
  );
};

export default StudentSection;
