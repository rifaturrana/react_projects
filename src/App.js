import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import NoteList from "./components/NoteList";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteList, setNoteList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);
  return (
    <div className="App">
      <Form
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        noteList={noteList}
        setNoteList={setNoteList}
        editableNote={editableNote}
        setEditableNote={setEditableNote}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <NoteList
        setNoteTitle={setNoteTitle}
        noteList={noteList}
        setNoteList={setNoteList}
        editableNote={editableNote}
        setEditableNote={setEditableNote}
        setEditMode={setEditMode}
      />
    </div>
  );
}

export default App;
