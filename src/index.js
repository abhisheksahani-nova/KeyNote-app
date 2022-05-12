import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/notes-context";
import { TrashProvider } from "./context/trash-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <TrashProvider>
          <App />
        </TrashProvider>
      </NotesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
