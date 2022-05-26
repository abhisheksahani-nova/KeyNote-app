import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async (token) => {
    try {
      const response = await axios.get("/api/notes", {
        headers: { authorization: token },
      });

      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewNote = async (token, note) => {
    try {
      const response = await axios.post(
        "/api/notes",
        { note },
        {
          headers: { authorization: token },
        }
      );

      setNotes(response.data.notes);

      toast("Note added", { type: "success" });
    } catch (error) {
      toast("Fail to add note", { type: "error" });
    }
  };

  const updateNote = async (token, note, id) => {
    try {
      const response = await axios.post(
        `/api/notes/${id}`,
        { note },
        {
          headers: { authorization: token },
        }
      );

      setNotes(response.data.notes);
      toast("Note updated", { type: "success" });
    } catch (error) {
      toast("Fail to update note", { type: "error" });
    }
  };

  const deleteNote = async (token, id) => {
    try {
      const response = await axios.delete(`/api/notes/${id}`, {
        headers: { authorization: token },
      });

      setNotes(response.data.notes);
      toast("Note Deleted", { type: "success" });
    } catch (error) {
      toast("Fail to delete note", { type: "error" });
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, getNotes, addNewNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
