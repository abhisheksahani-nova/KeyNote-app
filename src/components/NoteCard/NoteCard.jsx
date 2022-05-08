import React from "react";
import "./NoteCard.css";

function NoteCard({noteData}) {
  return (
    <div className="note-container">
      <div className="d-flex note-title-container">
        <h4>Title</h4>
        <i className="fa-solid fa-thumbtack"></i>
      </div>

      <small>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the method.
      </small>

      <div className="d-flex note-footer mt-2">
        <div className="d-flex note-footer note-label-priority-container">
          <small className="note-label-priority">Health</small>
          <small className="note-label-priority">High</small>
        </div>
        <div className="d-flex note-footer note-icons-container">
          <i className="fa-solid fa-pencil"></i>
          <i className="fa-solid fa-box-archive"></i>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
