import React from "react";
import { useEffect } from "react/cjs/react.production.min";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import { useTrash } from "../../context/trash-context";

function Trash() {
  const { trash } = useTrash();

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />
        <div className="notes-container">
          {trash?.length > 0 ? (
            <div className="d-flex notecard-container">
              {trash?.map((trashNote) => {
                return <NoteCard key={trashNote._id} noteInfo={trashNote} />;
              })}
            </div>
          ) : (
            <div className="d-flex align-item-center mt-5">
              <div className="d-flex flex-direction-col gap-1 empty-note-icon-cont">
                <i class="fa-solid fa-file empty-note-icon"></i>
                <button className="btn pri-outline-btn">Add notes</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Trash;
