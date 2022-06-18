import React from "react";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import { useTrash } from "../../context/trash-context";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotes } from "../../context/notes-context";

function Trash() {
  const { trash } = useTrash();
  const { theme } = useNotes();

  const navigate = useNavigate();
  const location = useLocation();

  function handleAddNotes() {
    if (location.pathname == "/trash") {
      navigate("/");
    }
  }

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
                <i
                  class={`fa-solid fa-file empty-note-icon ${
                    theme == "dark" && "empty-icon-dark-clr"
                  }`}
                ></i>
                <button
                  className={`btn pri-outline-btn ${
                    theme == "dark" && "pri-outline-btn-dark"
                  }`}
                  onClick={() => handleAddNotes()}
                >
                  Add notes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Trash;
