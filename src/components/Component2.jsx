import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllNotes, removeNote, createNote } from "../services/note";
const Component2 = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const {
    data: notes,
    fetchStatus,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
    refetchOnMount: false,
  });
  const client = useQueryClient();

  const removeMutation = useMutation(removeNote, {
    onSuccess: () => {
      client.invalidateQueries(["notes"]);
    },
  });
  const createMutation = useMutation(createNote, {
    onSuccess: () => {
      client.invalidateQueries(["notes"]);
    },
  });

  const createHandler = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
    };
    createMutation.mutate(newNote);
  };
  return (
    <div className="App">
      <center>
        <ul>
          <li>
            <Link to='/'>Go to comp1</Link>
          </li>
          <li>
            <Link to='/demo'>Go to comp2</Link>
          </li>
        </ul>
        <h2>Note Taking App</h2>
        <form>
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button onClick={(e) => createHandler(e)}>Add Note</button>
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
};

export default Component2;
