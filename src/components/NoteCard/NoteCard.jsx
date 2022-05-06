import React from "react";
import "./NoteCard.css";

function NoteCard() {
  return (
    <div class="note-container">
      <div class="d-flex note-title-container">
        <h4>Title</h4>
        <i class="fa-solid fa-thumbtack"></i>
      </div>

      <small>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the method.
      </small>

      <div class="d-flex note-footer mt-2">
        <div class="d-flex note-footer note-label-priority-container">
          <small class="note-label-priority">Health</small>
          <small class="note-label-priority">High</small>
        </div>
        <div class="d-flex note-footer note-icons-container">
          <i class="fa-solid fa-pencil"></i>
          <i class="fa-solid fa-box-archive"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
