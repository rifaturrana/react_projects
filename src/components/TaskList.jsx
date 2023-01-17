import { useState, useContext } from "react";
import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import { icons } from "../assets";
import { BoardContext } from "../contexts/Boards";
import { ListContext } from "../contexts/Lists";
import { TaskContext } from "../contexts/Tasks";
import TaskCard from "./TaskCard";
const TaskList = ({ taskList }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
  const { dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now() + "";
    dispatchTaskAction({
      type: "CREATE_TASK",
      payload: {
        id: id,
        title: taskTitle,
        boardId: taskList.boardId,
        listId: taskList.id,
      },
    });
    dispatchListAction({
      type: "ADD_TASK_TO_LIST",
      payload: {
        taskId: id,
        id: taskList.id,
      },
    });
    dispatchBoardAction({
      type: "ADD_TASK_TO_BOARD",
      payload: {
        taskId: id,
        id: taskList.boardId,
      },
    });
    setEditMode(false);
    setTaskTitle("");
  };
  const removeListHandler = () => {
    dispatchListAction({
      type: "REMOVE_LIST",
      payload: taskList.id,
    });
    dispatchBoardAction({
      type: "REMOVE_LIST_FROM_BOARD",
      payload: {
        listId: taskList.id,
        id: taskList.boardId,
      },
    });
  };
  return (
    <div className="list-container">
      <div className="list-title-container">
        <h5>{taskList.title}</h5>
        <img
          onClick={removeListHandler}
          src={icons.crossIcon}
          alt=""
          className="add-item-icon"
        />
      </div>
      {taskList.tasks
        .map((item) => {
          return allTasks.find((i) => i.id === item);
        })
        .map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      {!editMode ? (
        <AddItem setEditMode={setEditMode} />
      ) : (
        <AddItemForm
          title={taskTitle}
          onChaneHandler={(e) => setTaskTitle(e.target.value)}
          setEditMode={setEditMode}
          editMode={editMode}
          submithandler={submitHandler}
        />
      )}
    </div>
  );
};
export default TaskList;
