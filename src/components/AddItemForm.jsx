import { icons } from "../assets";

import React from "react";

const AddItemForm = ({
  listForm,
  submitHandler,
  title,
  onChangeHandler,
  setEditMode,
}) => {
  const createHandler = (e) => {
    e.stopPropagation();
    if (!title) {
      alert("Please provide a title");
    }
    submitHandler(e);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <form>
          <textarea
            className="form-textarea"
            name=""
            id=""
            cols="30"
            rows="2"
            value={title}
            onChange={onChangeHandler}
          ></textarea>
        </form>
      </div>
      <div className="button-container">
        <button onClick={(e) => createHandler(e)} className="add-button">
          {listForm ? "Add List" : "Add task"}
        </button>
        <img
          onClick={(e) => {
            e.stopPropagation();
            setEditMode(false);
          }}
          src={icons.crossIcon}
          className="form-icon"
          alt=""
        />
      </div>
    </div>
  );
};

export default AddItemForm;
