import React from "react";
import { useContext } from "react";
import { StudentContext } from "../contexts/Student";

const Form = () => {
  const {
    studentName,
    setStudents,
    students,
    setStudentName,
    editableStudent,
    editMode,
    setEditMode,
    setEditableStudent,
  } = useContext(StudentContext);

  const createStudentHandler = (e) => {
    e.preventDefault();
    if (!studentName) {
      return alert(`please provide a valid name`);
    }
    const newStudent = {
      id: Date.now() + "",
      name: studentName,
      // isPresent: undefined,
    };

    setStudents([...students, newStudent]);
    setStudentName("");
  };
  const updateHandler = (e) => {
    e.preventDefault();

    if (!studentName) {
      return alert(`please provide a valid name`);
    }
    const newStudentList = students.map((item) => {
      if (item.id === editableStudent.id) {
        item.name = studentName;
      }

      return item;
    });

    setStudents(newStudentList);

    setStudentName("");
    setEditMode(false);
    setEditableStudent(null);

    // setStudents()
  };

  return (
    <form
      onSubmit={(e) => {
        editMode ? updateHandler(e) : createStudentHandler(e);
      }}
      className="student-form"
    >
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button
        onClick={(e) => {
          editMode ? updateHandler(e) : createStudentHandler(e);
        }}
        type="submit"
      >
        Add Student
      </button>
    </form>
  );
};

export default Form;
