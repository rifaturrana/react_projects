import React from "react";
import { useContext } from "react";
import { icons } from "../assets";
import { BoardContext } from "../contexts/Boards";
import { ListContext } from "../contexts/Lists";
import { TaskContext } from "../contexts/Tasks";

const BoardItem = ({ board }) => {
  const { dispatchBoardAction } = useContext(BoardContext);
  const { lists, dispatchListAction } = useContext(ListContext);
  const { tasks, dispatchTaskAction } = useContext(TaskContext);
  const removeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatchBoardAction({ type: "REMOVE_BOARD", payload: board.id });
    const listToBeRemoved = lists.filter((item) => item.boardId === board.id);
    const taskToBeRemoved = tasks.filter((item) => item.boardId === board.id);
    listToBeRemoved.forEach((item) => {
      dispatchListAction({ type: "REMOVE_LIST", payload: item.id });
    });
    taskToBeRemoved.forEach((item) => {
      dispatchTaskAction({ type: "REMOVE_TASK", payload: item.id });
    });
  };

  return (
    <div className="board-box d-flex flex-direction-columm">
      <div className="d-flex justify-content-between">
        <h5 className="title-gap">{board.title}</h5>
        <img
          onClick={removeHandler}
          className="add-item-icon"
          src={icons.crossIcon}
          alt=""
        />
      </div>
    </div>
  );
};

export default BoardItem;
