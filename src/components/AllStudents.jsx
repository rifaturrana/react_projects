import React from "react";

const AllStudents = (props) => {
  const {
    students,
    setStudents,
    setEditMode,
    setEditableStudent,
    setStudentName,
  } = props;

  const presentHandler = (id) => {
    const presentStudent = students.map((s) => {
      if (s.id === id) {
        if (s.isPresent === undefined) {
          s.isPresent = true;
        } else if (s.isPresent === true) {
          alert("Already Present");
        } else if (s.isPresent === false) {
          alert("Please make use of the accidentally added button");
        }
      }
      return s;
    });
    setStudents(presentStudent);
  };
  const absentHandler = (id) => {
    const absentStudent = students.map((s) => {
      if (s.id === id) {
        if (s.isPresent === undefined) {
          s.isPresent = false;
        } else if (s.isPresent === false) {
          alert("Already Absent");
        } else if (s.isPresent === true) {
          alert("Please make use of the accidentally added button");
        }
      }
      return s;
    });
    setStudents(absentStudent);
  };
  const removeHandler = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const editHandler = (id) => {
    const editableStudent = students.find((s) => s.id === id);
    setEditMode(true);
    setEditableStudent(editableStudent);
    setStudentName(editableStudent.name);
  };
  return (
    <div className="list all-student-list">
      <h2>All Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name} </span>

            <button onClick={() => removeHandler(student.id)}>X</button>
            <button onClick={() => editHandler(student.id)}>Edit</button>
            <button onClick={() => presentHandler(student.id)}>
              Make Present
            </button>
            <button onClick={() => absentHandler(student.id)}>
              Make Absent
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudents;
