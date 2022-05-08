import React, { useState } from "react";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import "./Notes.css";
import { useNotes } from "../../context/notes-context";
import TextareaAutosize from "react-textarea-autosize";

function Notes() {
  const [openCreateNote, setOpenCreateNote] = useState(false);

  const { getNotes } = useNotes();
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />

        <div className="notes-container">
          <div className="d-flex align-items-start mb-2">
            {openCreateNote ? (
              <div className="create-note-container">
                <div className="d-flex title-inp-container mb-2">
                  <input
                    className="note-title-inp"
                    type="text"
                    placeholder="Title"
                  />
                  <i className="fa-solid fa-thumbtack"></i>
                </div>

                <TextareaAutosize
                  className="create-note-textarea"
                  placeholder="Take a note..."
                />

                <div className="d-flex note-footer mt-2">
                  <div className="d-flex note-footer note-icons-container create-note-footer-icons-container">
                    <i className="fa-solid fa-pencil"></i>
                    <i className="fa-solid fa-box-archive"></i>
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                  <div className="d-flex note-footer note-label-priority-container create-note-btn-container">
                    <button
                      onClick={() => setOpenCreateNote((prev) => !prev)}
                      className="btn btn-outline btn-small-size"
                    >
                      Close
                    </button>
                    <button className="btn pri-btn-style btn-small-size">Save</button>
                  </div>
                </div>
              </div>
            ) : (
              <input
                onClick={() => setOpenCreateNote((prev) => !prev)}
                className="nav_searchBar add-note-inp"
                type="text"
                placeholder="Take a note..."
              />
            )}

            <button className="btn pri-btn-style"><i class="fa-solid fa-filter"></i> Filter</button>
          </div>
          <div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                PINNED
              </small>
              <div className="d-flex notecard-container">
                <NoteCard />
              </div>
            </div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                OTHERS
              </small>
              <div className="d-flex notecard-container">
                <NoteCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notes;
