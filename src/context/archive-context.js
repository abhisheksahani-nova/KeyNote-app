import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNotes } from "./notes-context";
import { toast } from "react-toastify";

const ArchivesContext = createContext();

const ArchivesProvider = ({ children }) => {
  const [archives, setArchives] = useState([]);
  const { setNotes } = useNotes();

  const addNoteToArchives = async (token, note, id) => {
    try {
      const response = await axios.post(
        `/api/notes/archives/${id}`,
        { note },
        {
          headers: { authorization: token },
        }
      );

      setArchives(response.data.archives);
      setNotes(response.data.notes);
      toast("Note added to archive", { type: "success" });
    } catch (error) {
      toast("Fail to add note", { type: "error" });
    }
  };

  const restoreNoteFromArchives = async (token, id) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${id}`,
        {},
        {
          headers: { authorization: token },
        }
      );

      setArchives(response.data.archives);
      setNotes(response.data.notes);
      toast("Note restored from archive", { type: "success" });
    } catch (error) {
      toast("Fail to restore note", { type: "error" });
    }
  };

  const deleteNoteFromArchives = async (token, id) => {
    try {
      const response = await axios.delete(`/api/archives/delete/${id}`, {
        headers: { authorization: token },
      });

      setArchives(response.data.archives);
      toast("Note deleted from archive", { type: "success" });
    } catch (error) {
      toast("Fail to delete note", { type: "error" });
    }
  };

  return (
    <ArchivesContext.Provider
      value={{
        archives,
        setArchives,
        addNoteToArchives,
        restoreNoteFromArchives,
        deleteNoteFromArchives,
      }}
    >
      {children}
    </ArchivesContext.Provider>
  );
};

const useArchives = () => useContext(ArchivesContext);

export { ArchivesProvider, useArchives };
