import React from "react";
import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import StudentSection from "./components/StudentSection";
const App = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  return (
    <div className="App">
      <Form
        studentName={studentName}
        setStudentName={setStudentName}
        editMode={editMode}
        students={students}
        setStudents={setStudents}
        editableStudent={editableStudent}
        setEditableStudent={setEditableStudent}
        setEditMode={setEditMode}
      />
      <StudentSection
        students={students}
        setStudents={setStudents}
        setEditMode={setEditMode}
        setEditableStudent={setEditableStudent}
        setStudentName={setStudentName}
      />
    </div>
  );
};

export default App;
