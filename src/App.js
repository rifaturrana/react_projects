import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllNotes, removeNote, createNote } from "./services/note";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const {
    data: notes,
    isLoading,
    fetchStatus,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });
  const client = useQueryClient();

  const removeMutation = useMutation(removeNote, {
    onSuccess: () => {
      client.invalidateQueries(["notes"]);
    },
  });
  const CreateHandler = () => {
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
    };

    const createMutation = useMutation(createNote, {
      onSuccess: () => {
        client.invalidateQueries(["notes"]);
      },
    });
    createMutation.mutate(newNote);
  };
  return (
    <div className="App">
      <center>
        <h2>Note Taking App</h2>
        <form>
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button onClick={CreateHandler}>Add Note</button>
        </form>
        <ul>
          {notes?.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button>edit</button>
              <button onClick={() => removeMutation.mutate(item.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
        {fetchStatus === "fetching" && <div>Loading........</div>}
        {isError && <h2>{error?.message}</h2>}{" "}
      </center>
    </div>
  );
}

export default App;
