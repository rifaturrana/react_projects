import { useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";

import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import { icons } from "../assets";
import { BsThreeDots } from "react-icons/bs";
import { BiCopy, BiEdit } from "react-icons/bi";
import { MdDelete, MdDriveFileMove } from "react-icons/md";
import { BoardContext } from "../contexts/Board";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";
import TaskCard from "./TaskCard";

const TaskList = ({ taskList, index }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showBoard, setShowBoard] = useState({ show: false, label: undefined });
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
  const { lists, dispatchListAction } = useContext(ListContext);
  const { boards, dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now() + "";

    dispatchTaskAction({
      type: "CREATE_TASK",
      payload: {
        id: id,
        title: taskTitle,
        listId: taskList.id,
        boardId: taskList.boardId,
      },
    });

    dispatchListAction({
      type: "ADD_TASK_ID_TO_A_LIST",
      payload: { id: taskList.id, taskId: id },
    });
    dispatchBoardAction({
      type: "ADD_TASK_ID_TO_A_BOARD",
      payload: { id: taskList.boardId, taskId: id },
    });

    setEditMode(false);
    setTaskTitle("");
  };
  console.log(showMenu);

  const removeListHandler = () => {
    dispatchListAction({ type: "REMOVE_LIST", payload: taskList.id });
    dispatchBoardAction({
      type: "REMOVE_LIST_ID_FROM_A_BOARD",
      payload: { id: taskList.boardId, listId: taskList.id },
    });
  };
  const copyHandler = (e) => {};
  const moveHandler = (e) => {
    e.preventDefault();
    if (!selectedBoardId) {
      return alert("Please select a board and a list to move the list");
    }
    if (selectedBoardId === taskList.boardId) {
      return alert("You can't move the list to the same board and list");
    }
    if (taskList.boardId !== selectedBoardId) {
      dispatchBoardAction({
        type: "REMOVE_LIST_ID_FROM_A_BOARD",
        payload: { id: taskList.boardId, listId: taskList.id },
      });
      dispatchBoardAction({
        type: "ADD_LIST_ID_TO_A_BOARD",
        payload: { id: selectedBoardId, listId: taskList.id },
      });

      dispatchListAction({
        type: "CHANGE_BOARD_ID_OF_A_LIST",
        payload: { id: taskList.id, boardId: selectedBoardId },
      });
      dispatchBoardAction({
        type: "REMOVE_TASK_ID_FROM_A_BOARD",
        payload: {
          id: taskList.boardId,
          taskId: taskList.map((task) => task.tasks),
        },
      });
      dispatchBoardAction({
        type: "ADD_TASK_ID_TO_A_BOARD",
        payload: {
          id: selectedBoardId,
          taskId: taskList.map((task) => task.tasks),
        },
      });
      dispatchTaskAction({
        type: "CHANGE_BOARD_ID_OF_A_TASK",
        payload: {
          boardId: selectedBoardId,
          id: taskList.map((task) => task.tasks),
        },
      });
    }
  };
  return (
    <Droppable droppableId={taskList.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="list-container">
            <div className="list-title-container">
              <h5>{taskList.title}</h5>
              <BsThreeDots onClick={() => setShowMenu(!showMenu)} />

              <img
                onClick={removeListHandler}
                src={icons.crossIcon}
                alt=""
                className="add-item-icon"
              />
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
                        setShowBoard({ show: true, label: "Move List" })
                      }
                    >
                      Move
                    </MdDriveFileMove>
                    <BiCopy
                      onClick={() =>
                        setShowBoard({ show: true, label: "Copy List" })
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
                            showBoard.label === "Move List"
                              ? moveHandler(e)
                              : copyHandler(e)
                          }
                        >
                          <select
                            name=""
                            id=""
                            onChange={(e) => setSelectedBoardId(e.target.value)}
                          >
                            <option value="">Select Board</option>
                            {boards.map((board) => (
                              <option key={board.id} value={board.id}>
                                {board.title}
                              </option>
                            ))}
                          </select>

                          <button type="submit">
                            {showBoard.label === "Move List"
                              ? "Move List"
                              : "Copy List"}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {taskList.tasks
              .map((item) => {
                return allTasks.find((i) => i.id === item);
              })
              .map((task, index) => (
                <TaskCard index={index} task={task} key={task.id} />
              ))}
            {provided.placeholder}

            {!editMode ? (
              <AddItem setEditMode={setEditMode} />
            ) : (
              <AddItemForm
                title={taskTitle}
                onChangeHandler={(e) => setTaskTitle(e.target.value)}
                setEditMode={setEditMode}
                editMode={editMode}
                submitHandler={submitHandler}
              />
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
