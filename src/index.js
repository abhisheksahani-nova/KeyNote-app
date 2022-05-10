import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/notes-context";
import { TrashProvider } from "./context/trash-context";
import { ArchivesProvider } from "./context/archive-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <ArchivesProvider>
          <TrashProvider>
            <App />
          </TrashProvider>
        </ArchivesProvider>
      </NotesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
