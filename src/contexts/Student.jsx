import { createContext, useReducer } from "react";
import { studentReducer } from "../reducers/student";
export const StudentContext = createContext();

const initalState = {
  studentName: "",
  ediMode: false,
  students: [],
  editableStudent: null,
};

const StudentProvider = ({ children }) => {
  // const [studentName, setStudentName] = useState("");
  // const [students, setStudents] = useState([]);
  // const [editMode, setEditMode] = useState(false);
  // const [editableStudent, setEditableStudent] = useState(null);
  const [studentStates, dispatch] = useReducer(studentReducer, initalState);
  return (
    <StudentContext.Provider
      value={{
        studentStates,
        dispatch,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
