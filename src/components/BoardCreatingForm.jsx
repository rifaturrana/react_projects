import React from "react";
import { useState, useContext } from "react";
import { BoardContext } from "../contexts/Boards";
const BoardCreatingForm = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault(e);
    if (!boardTitle) {
      return alert("Please provide a board title");
    }
    dispatchBoardAction({ type: "CREATE_NEW_BOARD", payload: boardTitle });
    setBoardTitle("");
  };
  return (
    <div className="align-center m-top-md">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default BoardCreatingForm;
