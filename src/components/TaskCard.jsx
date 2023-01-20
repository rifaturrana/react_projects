import { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import AddItemForm from "./AddItemForm";
import { BsThreeDots } from "react-icons/bs";
import { BiCopy, BiEdit } from "react-icons/bi";
import { MdDelete, MdDriveFileMove } from "react-icons/md";

import { TaskContext } from "../contexts/Task";
import { ListContext } from "../contexts/List";
import { BoardContext } from "../contexts/Board";
import { icons } from "../assets";

const TaskCard = ({ task, index }) => {
  console.log(task);

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);
  const { tasks, dispatchTaskAction } = useContext(TaskContext);
  const { lists, dispatchListAction } = useContext(ListContext);
  const { boards, dispatchBoardAction } = useContext(BoardContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showBoard, setShowBoard] = useState({ show: false, label: undefined });
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  console.log(lists, boards, tasks);
  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatchTaskAction({
      type: "UPDATE_TASK",
      payload: { id: task.id, title: taskTitle },
    });
    setEditMode(false);
  };

  const removeHandler = () => {
    dispatchTaskAction({ type: "REMOVE_TASK", payload: task.id });
    dispatchListAction({
      type: "REMOVE_TASK_ID_FROM_A_LIST",
      payload: { id: task.listId, taskId: task.id },
    });
    dispatchBoardAction({
      type: "REMOVE_TASK_ID_FROM_A_BOARD",
      payload: { id: task.boardId, taskId: task.id },
    });
  };

  const copyHandler = (e) => {
    e.preventDefault();
    console.log(task.listId, selectedListId);
    console.log(task.boardId, selectedBoardId);
    if (task.listId === selectedListId && task.boardId === selectedBoardId) {
      if (
        lists.find((list) => list.id === selectedListId).tasks.includes(task.id)
      ) {
        alert("Task Already exist");
      }
    } else {
      dispatchBoardAction({
        type: "ADD_TASK_ID_TO_A_BOARD",
        payload: {
          id: selectedBoardId,
          taskId: task.id,
        },
      });
      dispatchListAction({
        type: "ADD_TASK_ID_TO_A_LIST",
        payload: {
          id: selectedListId,
          taskId: task.id,
        },
      });
    }
  };
  const moveHandler = (e) => {
    e.preventDefault();
    console.log(selectedBoardId);
    console.log(selectedListId);
    if (task.listId === selectedListId && task.boardId === selectedBoardId) {
      if (
        lists.find((list) => list.id === selectedListId).tasks.includes(task.id)
      ) {
        alert("Task Already exist");
      }
    } else if (
      task.listId !== selectedListId &&
      task.boardId === selectedBoardId
    ) {
      if (
        lists.find((list) => list.id === selectedListId).tasks.includes(task.id)
      ) {
        alert("Task Already exist");
      } else {
        dispatchListAction({
          type: "REMOVE_TASK_ID_FROM_A_LIST",
          payload: { id: task.listId, taskId: task.id },
        });
        dispatchListAction({
          type: "ADD_TASK_ID_TO_A_LIST",
          payload: {
            id: selectedListId,
            taskId: task.id,
          },
        });
        dispatchTaskAction({
          type: "CHANGE_LIST_ID_OF_A_TASK",
          payload: {
            id: task.id,
            listId: selectedListId,
          },
        });
      }
    } else if (
      task.boardId !== selectedBoardId &&
      task.listId !== selectedListId
    ) {
      dispatchBoardAction({
        type: "ADD_TASK_ID_TO_A_BOARD",
        payload: {
          id: selectedBoardId,
          taskId: task.id,
        },
      });
      dispatchListAction({
        type: "ADD_TASK_ID_TO_A_LIST",
        payload: {
          id: selectedListId,
          taskId: task.id,
        },
      });

      dispatchListAction({
        type: "REMOVE_TASK_ID_FROM_A_LIST",
        payload: { id: task.listId, taskId: task.id },
      });
      dispatchTaskAction({
        type: "CHANGE_LIST_ID_OF_A_TASK",
        payload: {
          id: task.id,
          listId: selectedListId,
        },
      });
      dispatchTaskAction({
        type: "CHANGE_BOARD_ID_OF_A_TASK",
        payload: {
          id: task.id,
          boardId: selectedBoardId,
        },
      });
    }
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        // console.log(provided);
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!editMode ? (
              <div>
                <div onClick={() => setEditMode(true)} className="task-card">
                  <p>{task.title}</p>
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                      setShowBoard(!showBoard);
                    }}
                  />
                  <img
                    onClick={removeHandler}
                    src={icons.crossIcon}
                    alt=""
                    className="add-item-icon"
                  />
                </div>

                {showMenu && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <BiEdit>Edit</BiEdit>
                      <MdDriveFileMove
                        onClick={() =>
                          setShowBoard({ show: true, label: "Move Task" })
                        }
                      >
                        Move
                      </MdDriveFileMove>
                      <BiCopy
                        onClick={() =>
                          setShowBoard({ show: true, label: "Copy Task" })
                        }
                      >
                        Copy
                      </BiCopy>
                      <MdDelete>Delete</MdDelete>
                    </div>
                    <div>
                      {showBoard.show && (
                        <div>
                          <h3>{showBoard.label}</h3>
                          <form
                            onSubmit={(e) =>
                              showBoard.label === "Move Task"
                                ? moveHandler(e)
                                : copyHandler(e)
                            }
                          >
                            <select
                              name=""
                              id=""
                              onChange={(e) =>
                                setSelectedBoardId(e.target.value)
                              }
                            >
                              <option value="">Select Board</option>
                              {boards.map((board) => (
                                <option key={board.id} value={board.id}>
                                  {board.title}
                                </option>
                              ))}
                            </select>
                            <select
                              name=""
                              id=""
                              onChange={(e) =>
                                setSelectedListId(e.target.value)
                              }
                            >
                              <option value="">Select List</option>
                              {lists
                                .filter(
                                  (list) => list.boardId === selectedBoardId
                                )
                                .map((list) => (
                                  <option key={list.id} value={list.id}>
                                    {list.title}
                                  </option>
                                ))}
                              {/* {lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                  {list.title}
                                </option>
                              ))} */}
                            </select>
                            <button type="submit">
                              {showBoard.label === "Move Task"
                                ? "Move Task"
                                : "Copy Task"}
                            </button>
                            {/* {showBoard.label === "Move Task" ? (
                              <button>Move task</button>
                            ) : (
                              <button type="submit" onClick={copyHandler}>
                                Copy task
                              </button>
                            )} */}
                          </form>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <AddItemForm
                title={taskTitle}
                onChangeHandler={(e) => setTaskTitle(e.target.value)}
                setEditMode={setEditMode}
                submitHandler={submitHandler}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
