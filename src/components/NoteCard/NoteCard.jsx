import React from "react";
import "./NoteCard.css";
import { useNotes } from "../../context/notes-context";

function NoteCard({ noteInfo }) {
  const { _id, title, note, priority, isPinned } = noteInfo;
  const { notes, setNotes, deleteNote} = useNotes();
  const token = localStorage.getItem("token");

  function handleTogglePinNote() {
    let tempNote = notes;
    let findNote = tempNote.find((note) => note._id == _id);
    let togglePinNote = { ...findNote, isPinned: !findNote.isPinned };
    let filterPinNote = tempNote.filter((note) => note._id !== _id);
    filterPinNote.push(togglePinNote);
    setNotes([...filterPinNote]);
  }

  return (
    <div className="note-container">
      <div className="d-flex note-title-container">
        <h4> {title} </h4>
        <i
          className="fa-solid fa-thumbtack"
          onClick={() => handleTogglePinNote()}
        ></i>
      </div>

      <small>{note}</small>

      <div className="d-flex note-footer mt-2">
        <div className="d-flex note-footer note-label-priority-container">
          <small className="note-label-priority">Health</small>
          <small className="note-label-priority"> {priority} </small>
        </div>
        <div className="d-flex note-footer note-icons-container">
          <i className="fa-solid fa-pencil"></i>
          <i className="fa-solid fa-box-archive"></i>
          <i
            className="fa-solid fa-trash-can"
            onClick={() => {
              deleteNote(token, _id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
