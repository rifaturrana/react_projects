const baseUrl = "http://localhost:8080/notes";

export const getAllNotes = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

export const getNoteByID = async (id) => {
  const response = await fetch(baseUrl + "/" + id);
  return await response.json();
};

export const createNote = async (note) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return await response.json();
};

export const updateNote = async (note) => {
  return await fetch(baseUrl + `/${note.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(note),
  });
};

export const removeNote = async (id) => {
  return await fetch(baseUrl + "/" + id, {
    method: "DELETE",
  });
};
