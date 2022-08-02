import React, { useState } from "react";
import {
  Navbar,
  Sidebar,
  NoteCard,
  LabelDropdown,
} from "../../components/index";
import { useArchives } from "../../context/archive-context";
import "./Archives.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotes } from "../../context/notes-context";

function Archives() {
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { archives, restoreNoteFromArchives } = useArchives();
  const { theme } = useNotes();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();

  function handleAddNotes() {
    if (location.pathname == "/archives") {
      navigate("/home");
    }
  }

  function filterNotesOnSearchQuery(notes) {
    let filteredNotes = notes;

    filteredNotes = filteredNotes.filter((note) =>
      note.title.includes(searchQuery)
    );

    return filteredNotes;
  }

  const archiveNotes = filterNotesOnSearchQuery(archives);

  function handleUnarchiveAllNotes() {
    archiveNotes.map((note) => restoreNoteFromArchives(token, note._id));
  }

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} />
      <section className="d-flex">
        <Sidebar setIsLabelDropdownOpen={setIsLabelDropdownOpen} />

        {isLabelDropdownOpen && (
          <LabelDropdown
            setIsLabelDropdownOpen={setIsLabelDropdownOpen}
            isAddNewLabel={true}
          />
        )}

        <div className="notes-container">
          <div className="d-flex j-content-right">
            <button
              className={`btn pri-outline-btn mr-2 ${
                theme == "dark" && "pri-outline-btn-dark "
              }`}
              onClick={() => handleUnarchiveAllNotes()}
            >
              Unarchive All
            </button>
          </div>

          {archiveNotes?.length > 0 ? (
            <div className="d-flex notecard-container">
              {archiveNotes.map((archiveNote) => {
                return (
                  <NoteCard key={archiveNote._id} noteInfo={archiveNote} />
                );
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

export default Archives;
