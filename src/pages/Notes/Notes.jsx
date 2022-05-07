import React,{useEffect} from "react";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import "./Notes.css";
import { useNotes } from "../../context/notes-context";

function Notes() {
  const { getNotes } = useNotes();
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />

        <div className="notes-container">
          <div className="note-inp-container mb-2">
            {/* <input
              className="nav_searchBar add-note-inp"
              type="text"
              placeholder="Take a note..."
            /> */}
            <div>
              
            </div>
            <button className="btn pri-btn-style">Filter</button>
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
