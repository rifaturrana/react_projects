import React from "react";
const NoteList = (props) => {
  const removeHandler = (id) => {
    const newNotes = props.noteList.filter((item) => item.id !== id);
    props.setNoteList(newNotes);
  };

  const editHandler = (id) => {
    const toBeEditableNote = props.noteList.find((item) => item.id === id);
    props.setEditMode(true);
    props.setEditableNote(toBeEditableNote);
    props.setNoteTitle(toBeEditableNote.title);
  };
  return (
    <ul>
      {props.noteList?.map((note) => (
        <li key={note.id}>
          <span>{note.title}</span>
          <button onClick={() => editHandler(note.id)}>Edit</button>
          <button onClick={() => removeHandler(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
