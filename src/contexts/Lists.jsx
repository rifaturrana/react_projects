import { createContext, useReducer } from "react";
import { listsReducer } from "../reducers/lists";

export const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [lists, dispatchListAction] = useReducer(listsReducer, []);

  return (
    <ListContext.Provider value={{ lists, dispatchListAction }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
