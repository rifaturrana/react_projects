import { useState, useContext } from "react";

import AddItemForm from "./AddItemForm";
import { icons } from "../assets";
import { BoardContext } from "../contexts/Boards";
import { ListContext } from "../contexts/Lists";
import { TaskContext } from "../contexts/Tasks";

const TaskCard = ({ task }) => {
  const { tasks, dispatchTaskAction } = useContext(TaskContext);
  const { dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext);
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatchTaskAction({
      type: "EDIT_TASK",
      payload: {
        id: task.id,
        title: taskTitle,
      },
    });
    setEditMode(false);
  };
  const removeHandler = () => {
    dispatchTaskAction({
      type: "REMOVE_TASK",
      payload: task.id,
    });
    dispatchListAction({
      type: "REMOVE_TASK_FROM_LIST",
      payload: {
        taskId: task.id,
        id: task.listId,
      },
    });
    dispatchBoardAction({
      type: "REMOVE_TASK_FROM_BOARD",
      payload: {
        taskId: task.id,
        id: task.boardId,
      },
    });
  };
  return (
    <div>
      {!editMode ? (
        <div onClick={() => setEditMode(true)}>
          <div className="task-card">
            <p>{task.title}</p>
            <img
              onClick={removeHandler}
              className="add=item-icon"
              src={icons.crossIcon}
              alt=""
            />
          </div>
        </div>
      ) : (
        <AddItemForm
          submitHandler={submitHandler}
          title={taskTitle}
          onChangeHandler={(e) => setTaskTitle(e.target.value)}
        />
      )}
    </div>
  );
};
export default TaskCard;
