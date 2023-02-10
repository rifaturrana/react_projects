import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8080/` }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({ url: `notes` }),
      providesTags: [{ type: "Notes", id: "NoteList" }],
    }),

    createNote: builder.mutation({
      query: (note) => ({ url: `notes`, method: "POST", body: note }),
      invalidatesTags: [{ type: "Notes", id: "NoteList" }],
    }),

    updateNote: builder.mutation({
      query: (id, note) => ({
        url: `notes/${id}`,
        method: "PUT",
        body: note,
      }),

      invalidatesTags: [{ type: "Notes", id: "NoteList" }],
    }),
    removeNote: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notes", id: "NoteList" }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
} = noteApi;
