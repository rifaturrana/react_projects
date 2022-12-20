import React from "react";

const Form = (props) => {
  const {
    studentName,
    setStudentName,
    editMode,
    setStudents,
    students,
    setEditMode,
    editableStudent,
    setEditableStudent,
  } = props;

  const createStudentHandler = (e) => {
    e.preventDefault();
    if (!studentName) {
      return alert("Please enter student name");
    }
    const newstudent = {
      id: Date.now() + "",
      name: studentName,
    };
    setStudents([...students, newstudent]);
    setStudentName("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!studentName) {
      return alert("Please enter student name");
    }
    const newStudentList = students.map((item) => {
      if (item.id === editableStudent.id) {
        item.name = studentName;
      }
      return item;
    });
    setStudents(newStudentList);
    setEditMode(false);
    setEditableStudent(null);
    setStudentName("");
  };
  return (
    <form
      onSubmit={(e) => {
        editMode ? updateHandler(e) : createStudentHandler(e);
      }}
      className="student-from"
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
