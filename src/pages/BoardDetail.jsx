import { React, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../contexts/Lists";
import { BoardContext } from "../contexts/Boards";
import { TaskContext } from "../contexts/Tasks";
import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import { listsReducer } from "../reducers/lists";

const BoardDetail = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const { lists, dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext);
  const { boardId } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now() + "";
    dispatchListAction({
      type: "CREATE_LIST",
      payload: {
        id: id,
        title: listTitle,
        boardId: boardId,
      },
    });
    dispatchBoardAction({
      type: "ADD_LIST_ID_TO_A_BOARD",
      payload: {
        boardId: boardId,
        listId: id,
      },
    });
    setEditMode(false);
    setListTitle("");
  };
  return (
    <div className="d-flex m-to-sm flex-direction-row">
      <Link to="/">Back to Boards</Link>
      {lists
        .filter((item) => item.boardId === boardId)
        .map((lists) => (
          <li key={lists.id}>{lists.title}</li>
        ))}
      {!editMode ? (
        <AddItem listAddItem={true} setEditMode={setEditMode} />
      ) : (
        <AddItemForm
          setEditMode={setEditMode}
          listForm={true}
          submitHandler={submitHandler}
          title={listTitle}
          onChangeHandler={(e) => setListTitle(e.target.value)}
        />
      )}
    </div>
  );
};

export default BoardDetail;
