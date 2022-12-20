import React from "react";

const Form = (props) => {
  const {
    noteTitle,
    setNoteList,
    noteList,
    setEditMode,
    editMode,
    editableNote,
    setEditableNote,
    setNoteTitle,
  } = props;

  const AddToNote = (e) => {
    e.preventDefault();
    if (!noteTitle) {
      alert("Please select a title");
    } else {
      const newNote = {
        id: Date.now() + "",
        title: noteTitle,
      };
      setNoteList([...noteList, newNote]);
      setNoteTitle("");
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!noteTitle) {
      alert("Please select a title");
    } else {
      const newNotes = noteList.map((item) => {
        if (item.id === editableNote.id) {
          item.title = noteTitle;
        }
        return item;
      });
      setNoteList(newNotes);
      setNoteTitle("");
      setEditMode(false);
      setEditableNote(null);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        editMode ? updateHandler(e) : AddToNote(e);
      }}
    >
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />

      <button
        onClick={(e) => {
          editMode ? updateHandler(e) : AddToNote(e);
        }}
      >
        {editMode ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default Form;
