import { createContext, useState } from "react";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  return (
    <StudentContext.Provider
      value={{
        studentName,
        setStudentName,
        students,
        setStudents,
        editMode,
        setEditMode,
        editableStudent,
        setEditableStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
