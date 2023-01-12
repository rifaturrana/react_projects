import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BoardProvider from "./contexts/Boards";
import ListProvider from "./contexts/Lists";
import TaskProvider from "./contexts/Tasks";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BoardProvider>
      <ListProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ListProvider>
    </BoardProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
