import React from "react";
import { Navbar, Sidebar, NoteCard } from "./components/index";

function App() {
  return (
    <div>
      <Navbar />
      <section class="d-flex">
        <Sidebar />
      </section>
    </div>
  );
}

export default App;
