import "./App.css";
import {
  useGetNotesQuery,
  useRemoveNoteMutation,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "./store/api/notes";
import { useState } from "react";
const App = () => {
  const [editMode, setEditMode] = useState(false);
  const { data, isLoading, isError, error } = useGetNotesQuery();
  const [removeNoteMutation] = useRemoveNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();
  const [createNoteMutation] = useCreateNoteMutation();
  const [noteTitle, setNoteTitle] = useState("");
  const [editableNote, setEditableNote] = useState(null);

  const createHandler = (e) => {
    e.preventDefault();
    createNoteMutation({
      id: Date.now() + "",
      title: noteTitle,
    });
    setNoteTitle("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!noteTitle) {
      return alert("Please enter a title");
    }
    const updatedNote = {
      id: editableNote.id,
      title: noteTitle,
    };
    updateNoteMutation(editableNote.id, updatedNote);
    setNoteTitle("");
    setEditMode(false);
    setEditableNote(null);
  };

  const editHandler = (id) => {
    const toBeEditedNote = data.find((note) => note.id === id);
    setEditMode(true);
    setEditableNote(toBeEditedNote);
    setNoteTitle(toBeEditedNote.title);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => (editMode ? updateHandler(e) : createHandler(e))}>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <button type="submit">
          {editMode ? "Update Note" : "Create note"}
        </button>
      </form>
      <ul>
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error: {error.message}</li>}
        {data &&
          data.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>{" "}
              <button onClick={() => removeNoteMutation(note.id)}>
                Delete
              </button>
              <button onClick={() => editHandler(note.id)}>Edit</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
