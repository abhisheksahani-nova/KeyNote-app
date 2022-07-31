import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TrashContext = createContext();

const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);

  const addNoteToTrash = (noteInfo) => {
    try {
      setTrash([...trash, noteInfo]);
      toast("Note added to trash", { type: "success" });
    } catch (error) {
      toast("Fail to add note to trash", { type: "error" });
    }
  };

  const restoreNoteFromTrash = (noteInfo) => {
    try {
      const removedNote = trash.filter((note) => note._id !== noteInfo._id);
      setTrash(removedNote);
      toast("Note restored from trash", { type: "success" });
    } catch (error) {
      toast("Fail to restore note", { type: "error" });
    }
  };

  const deleteNoteFromTrash = (id) => {
    try {
      const removedNote = trash.filter((note) => note._id !== id);
      setTrash(removedNote);
      toast("Note deleted", { type: "success" });
    } catch (error) {
      toast("Fail to delete note", { type: "error" });
    }
  };

  const deleteAllNotesFromTrash = () => {
    try {
      setTrash([]);
      toast("All note deleted", { type: "success" });
    } catch (error) {
      toast("Fail to delete all note", { type: "error" });
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
        deleteAllNotesFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
