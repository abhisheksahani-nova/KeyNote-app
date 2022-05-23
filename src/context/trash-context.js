import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNotes, deleteNote } from "./notes-context";

const TrashContext = createContext();

const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);
  const { setNotes, notes } = useNotes();

  const addNoteToTrash = async (noteInfo) => {
    try {
      setTrash([...trash, noteInfo]);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreNoteFromTrash = async (noteInfo) => {
    try {
      const removedNote = trash.filter((note) => note._id !== noteInfo._id);
      setTrash(removedNote);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteFromTrash = async (id) => {
    try {
      const removedNote = trash.filter((note) => note._id !== id);
      setTrash(removedNote);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TrashContext.Provider
      value={{
        trash,
        setTrash,
        addNoteToTrash,
        restoreNoteFromTrash,
        deleteNoteFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
