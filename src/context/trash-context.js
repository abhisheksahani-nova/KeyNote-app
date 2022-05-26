import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TrashContext = createContext();

const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);

  const addNoteToTrash = async (noteInfo) => {
    try {
      setTrash([...trash, noteInfo]);
      toast("Note added to trash", { type: "success" });
    } catch (error) {
      toast("Fail to add note to trash", { type: "error" });
    }
  };

  const restoreNoteFromTrash = async (noteInfo) => {
    try {
      const removedNote = trash.filter((note) => note._id !== noteInfo._id);
      setTrash(removedNote);
      toast("Note restored from trash", { type: "success" });
    } catch (error) {
      toast("Fail to restore note", { type: "error" });
    }
  };

  const deleteNoteFromTrash = async (id) => {
    try {
      const removedNote = trash.filter((note) => note._id !== id);
      setTrash(removedNote);
      toast("Note deleted", { type: "success" });
    } catch (error) {
      toast("Fail to delete note", { type: "error" });
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
