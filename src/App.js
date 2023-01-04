import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const getAllNotes = async () => {
    try {
      const response = await fetch("http://localhost:8080/notes");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error fetching notes");
      }
      setNotes(data);
      setIsLoading(false);
      setNoteTitle("");
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message);
    }
  };

  const createHandler = (e) => {
    e.preventDefault();
    if (!noteTitle) {
      return alert("Please enter a title");
    }
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
    };
    fetch(`http://localhost:8080/notes`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getAllNotes();
    });
  };
  const removeHandler = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE",
    }).then(() => {
      getAllNotes();
    });
  };
  const editHandler = (id) => {
    const toBeEditedNote = notes.find((note) => note.id === id);

    setEditMode(true);
    setEditableNote(toBeEditedNote);
    setNoteTitle(toBeEditedNote.title);
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

    fetch(`http://localhost:8080/notes/${editableNote.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getAllNotes();
      setEditMode(false);
      setEditableNote(null);
      setNoteTitle("");
    });
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div className="App">
      <form onSubmit={editMode ? updateHandler : createHandler}>
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
        {notes.map((note) => (
          <li key={note.id}>
            <span> {note.title} </span>

            <button onClick={() => editHandler(note.id)}>Edit</button>
            <button onClick={() => removeHandler(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isLoading && (
        <div>
          <h1>Loading...........</h1>
        </div>
      )}
      {errorMessage && (
        <div>
          <h1>{errorMessage}</h1>
        </div>
      )}
    </div>
  );
}

/**
 * 1) state ba props change -> Component Rerun -> ReRender
 */
export default App;
