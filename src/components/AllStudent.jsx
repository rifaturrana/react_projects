import React from "react";
import { useContext } from "react";
import { StudentContext } from "../contexts/Student";
const AllStudent = () => {
  const { studentStates, dispatch } = useContext(StudentContext);
  // const removeHandler = (id) => {
  //   // const newStudentList = students.filter((item) => item.id !== id);
  //   // setStudents(newStudentList);

  //   setStudents(students.filter((item) => item.id !== id));
  // };

  // const editHandler = (id) => {
  //   const toBeEditedStudent = students.find((item) => item.id === id);
  //   setEditMode(true);
  //   setEditableStudent(toBeEditedStudent);
  //   setStudentName(toBeEditedStudent.name);
  // };

  // const presentHandler = (id) => {
  //   const newStudentList = students.map((item) => {
  //     if (item.id === id) {
  //       if (item.isPresent === undefined) {
  //         item.isPresent = true;
  //       } else if (item.isPresent === true) {
  //         alert(`This student is already in Present List`);
  //       } else if (item.isPresent === false) {
  //         alert(`Please Make use of the accidentally added button`);
  //       }
  //     }

  //     return item;
  //   });

  //   setStudents(newStudentList);
  // };

  // const absentHandler = (id) => {
  //   const newStudentList = students.map((item) => {
  //     if (item.id === id) {
  //       if (item.isPresent === undefined) {
  //         item.isPresent = false;
  //       } else if (item.isPresent === true) {
  //         alert(`Please use the accidentally added Button`);
  //       } else if (item.isPresent === false) {
  //         alert(`This student is already in Absent List`);
  //       }
  //     }

  //     return item;
  //   });

  //   setStudents(newStudentList);
  // };
  return (
    <div className="list all-student-list">
      <h2>All Student List</h2>
      <ul>
        {studentStates.students.map((student) => (
          <li key={student.id}>
            <span>{student.name}</span>
            <button
              onClick={() =>
                dispatch({ type: "edit_student", payload: student.id })
              }
            >
              Edit
            </button>
            <button
              onClick={() =>
                dispatch({ type: "remove_student", payload: student.id })
              }
            >
              Delete
            </button>
            <button
              onClick={() =>
                dispatch({ type: "make_present", payload: student.id })
              }
            >
              Make Present
            </button>
            <button
              onClick={() =>
                dispatch({ type: "make_absent", payload: student.id })
              }
            >
              Make Absent
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudent;
