import axios from "axios";
import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async (token) => {
    try {
      const response = await axios.get("/api/notes", {
        headers: { authorization: token },
      });

      setNotes(response.data.notes);
      console.log(response);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (token, note, id) => {
    try {
      const response = await axios.post(
        `/api/notes/:${id}`,
        { note },
        {
          headers: { authorization: token },
        }
      );

      setNotes(response.data.notes);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (token, note, id) => {
    try {
      const response = await axios.delete(`/api/notes/:${id}`, {
        headers: { authorization: token },
      });

      setNotes(response.data.notes);
      console.log(response);
    } catch (error) {
      console.log(error);
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
