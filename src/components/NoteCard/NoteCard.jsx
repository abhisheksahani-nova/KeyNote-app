import React from "react";
import "./NoteCard.css";
import { useNotes } from "../../context/notes-context";
import { useArchives } from "../../context/archive-context";

function NoteCard({
  noteInfo,
  setNoteData,
  setNoteId,
  setIsUpdateNote,
  setOpenCreateNote,
}) {
  const { _id, title, note, priority, isPinned } = noteInfo;
  const { notes, setNotes, deleteNote } = useNotes();
  const { addNoteToArchives } = useArchives();
  const token = localStorage.getItem("token");

  function handleTogglePinNote() {
    const tempNotes = notes;
    const findNote = tempNotes.find((note) => note._id === _id);
    const togglePinNote = { ...findNote, isPinned: !findNote.isPinned };
    const filterPinNote = tempNotes.filter((note) => note._id !== _id);
    filterPinNote.push(togglePinNote);
    setNotes([...filterPinNote]);
  }

  function handleUpdateNote(id) {
    const tempNotes = notes;
    const findNoteToUpdate = tempNotes.filter((note) => note._id === id);
    setNoteData({
      title: findNoteToUpdate[0].title,
      note: findNoteToUpdate[0].note,
      priority: findNoteToUpdate[0].priority,
      isPinned: findNoteToUpdate[0].isPinned,
    });
    setNoteId(id);
    setOpenCreateNote((prev) => !prev);
    setIsUpdateNote((prev) => !prev);
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
          <i
            className="fa-solid fa-pencil"
            onClick={() => handleUpdateNote(_id)}
          ></i>
          <i
            className="fa-solid fa-box-archive"
            onClick={() => addNoteToArchives(token, noteInfo, _id)}
          ></i>
          <i
            className="fa-solid fa-trash-can"
            onClick={() => deleteNote(token, _id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
