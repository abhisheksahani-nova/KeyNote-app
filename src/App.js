import React, { useEffect } from "react";
import { Notes, Login, Signup, Archives, Trash } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Mockman from "mockman-js";

function App() {
  if (typeof window !== "undefined") {
    injectStyle();
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Notes />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/archives" element={<Archives />}></Route>
        <Route path="/trash" element={<Trash />}></Route>
        <Route path="/mock" element={<Mockman />}></Route>
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
