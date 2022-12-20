import React from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

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

  const removeHandler = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const editHandler = (id) => {
    const editableStudent = students.find((s) => s.id === id);
    setEditMode(true);
    setEditableStudent(editableStudent);
    setStudentName(editableStudent.name);
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
    <div className="App">
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
      <div className="student-section">
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
        <div className="list present-student-list">
          <h2>Present Students</h2>
          <ul>
            {students
              .filter((s) => s.isPresent === true)
              .map((student) => (
                <li>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>
                    Accidentally Added
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="list absent-student-list">
          <h2>Absent Students</h2>
          <ul>
            {students
              .filter((s) => s.isPresent === false)
              .map((student) => (
                <li>
                  <span>{student.name}</span>
                  <button onClick={() => toggleHandler(student.id)}>
                    Accidentally Added
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
