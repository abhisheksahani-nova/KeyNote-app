import React from "react";
import { useEffect } from "react/cjs/react.production.min";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import { useTrash } from "../../context/trash-context";

function Trash() {
  const { trash} = useTrash();

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />
        <div className="notes-container">
          <div className="d-flex notecard-container">
            {trash?.map((trashNote) => {
              return <NoteCard key={trashNote._id} noteInfo={trashNote} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trash;
