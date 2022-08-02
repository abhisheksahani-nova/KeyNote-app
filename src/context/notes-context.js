import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const loginUser = async (userLoginData) => {
    try {
      const response = await axios.post("/api/auth/login", userLoginData);
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("email", userLoginData.email);
      toast("Successfully login", { type: "success" });
      navigate("/home");
    } catch (error) {
      toast("Fail to login", { type: "error" });
    }
  };

  const guestLogin = async () => {
    const userLoginData = {
      email: "abhisheksahani@gmail.com",
      password: "abhisheksahani123",
    };

    try {
      const response = await axios.post("/api/auth/login", userLoginData);
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("email", userLoginData.email);
      localStorage.setItem("username", "Abhishek Sahani");
      toast("Successfully login", { type: "success" });
      navigate("/home");
    } catch (error) {
      toast("Fail to login", { type: "error" });
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        addNewNote,
        updateNote,
        deleteNote,
        loginUser,
        guestLogin,
        theme,
        setTheme,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
