import React from "react";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import "./Notes.css";

function Notes() {
  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />

        <div className="notes-container">
          <div className="note-inp-container mb-2">
            <input
              className="nav_searchBar add-note-inp"
              type="text"
              placeholder="Take a note..."
            />
            <button className="btn pri-btn-style">Filter</button>
          </div>
          <div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                PINNED
              </small>
              <div className="d-flex notecard-container">
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
              </div>
            </div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                OTHERS
              </small>
              <div className="d-flex notecard-container">
                <NoteCard />
                <NoteCard />
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
