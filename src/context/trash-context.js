import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNotes } from "./notes-context";

const TrashContext = createContext();

const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);
  const { setNotes } = useNotes();

  const getAllTrashNotes = async (token) => {
    try {
      const response = await axios.get(`/api/trash`, {
        headers: { authorization: token },
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const addNoteToTrash = async (token, noteId) => {
    try {
      const response = await axios.post(
        `/api/trash/${noteId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      console.log(response)

      setTrash(response.data.trash);
      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreNoteFromTrash = async (token, noteId) => {
    try {
      const response = await axios.post(
        `/api/trash/restore/${noteId}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      setTrash(response.data.trash);
      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteFromTrash = async (token, id) => {
    try {
      const response = await axios.delete(`/api/trash/delete/${id}`, {
        headers: { authorization: token },
      });

      setTrash(response.data.trash);
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
        getAllTrashNotes
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
