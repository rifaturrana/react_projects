import { createContext, useReducer } from "react";
import { taskReducer } from "../reducers/task";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [lists, dispatchTaskAction] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ lists, dispatchTaskAction }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
