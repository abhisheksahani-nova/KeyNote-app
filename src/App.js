import React, { useEffect } from "react";
import {
  Notes,
  Login,
  Signup,
  Archives,
  Trash,
  LandingPage,
  Profile,
} from "./pages/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Mockman from "mockman-js";
import { useNotes } from "./context/notes-context";

function App() {
  const { theme } = useNotes();
  const navigate = useNavigate();

  if (typeof window !== "undefined") {
    injectStyle();
  }

  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, []);

  return (
    <div className="app" data-theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Notes />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/archives" element={<Archives />}></Route>
        <Route path="/trash" element={<Trash />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/mock" element={<Mockman />}></Route>
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
