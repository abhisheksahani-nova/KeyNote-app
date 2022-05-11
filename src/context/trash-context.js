import axios from "axios";
import { createContext, useContext, useState } from "react";

const TrashContext = createContext();

const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);

  const addNoteToTrash = async (token, id) => {
    try {
      const response = await axios.post(`/api/trash/${id}`, {
        headers: { authorization: token },
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TrashContext.Provider value={{ trash, setTrash, addNoteToTrash }}>
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
