import { createContext, useReducer } from "react";
import { boardReducers } from "../reducers/boards";

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boards, dispatchBoardAction] = useReducer(boardReducers, []);

  return (
    <BoardContext.Provider value={{ boards, dispatchBoardAction }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
