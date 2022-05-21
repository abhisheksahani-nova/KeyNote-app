import React from "react";
import { Navbar, Sidebar, NoteCard } from "../../components/index";
import { useArchives } from "../../context/archive-context";

function Archives() {
  const { archives } = useArchives();

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />
        <div className="notes-container">
          <div className="d-flex notecard-container">
            {archives.map((archiveNote) => {
              return <NoteCard key={archiveNote._id} noteInfo={archiveNote} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Archives;
