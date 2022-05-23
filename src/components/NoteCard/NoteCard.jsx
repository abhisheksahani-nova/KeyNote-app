import React from "react";
import { useLocation } from "react-router-dom";
import "./NoteCard.css";
import { useNotes } from "../../context/notes-context";
import { useArchives } from "../../context/archive-context";
import { useTrash } from "../../context/trash-context";

function NoteCard({
  noteInfo,
  setNoteData,
  setNoteId,
  setIsUpdateNote,
  setOpenCreateNote,
}) {
  const { _id, title, note, priority, createdAt, tags, noteColor } = noteInfo;
  const { notes, setNotes, deleteNote, addNewNote, updateNote } = useNotes();
  const { addNoteToArchives, deleteNoteFromArchives, restoreNoteFromArchives } =
    useArchives();

  const { addNoteToTrash, deleteNoteFromTrash, restoreNoteFromTrash } =
    useTrash();
  const token = localStorage.getItem("token");
  const location = useLocation();

  function handleTogglePinNote(token, _id) {
    const tempNotes = notes;
    const findNote = tempNotes.find((note) => note._id === _id);
    const togglePinNote = { ...findNote, isPinned: !findNote.isPinned };

    updateNote(token, togglePinNote, _id);
  }

  function handleUpdateNote(id) {
    const tempNotes = notes;
    const findNoteToUpdate = tempNotes.filter((note) => note._id === id);
    setNoteData({
      title: findNoteToUpdate[0].title,
      note: findNoteToUpdate[0].note,
      priority: findNoteToUpdate[0].priority,
      priorityRank: findNoteToUpdate[0].priorityRank,
      isPinned: findNoteToUpdate[0].isPinned,
      tags: findNoteToUpdate[0].tags,
    });
    setNoteId(id);
    setOpenCreateNote((prev) => !prev);
    setIsUpdateNote((prev) => !prev);
  }

  function handleRestoreNoteFromTrash(noteInfo, token) {
    restoreNoteFromTrash(noteInfo);
    addNewNote(token, noteInfo);
  }

  function handleAddNoteToTrash(noteInfo, _id, token) {
    addNoteToTrash(noteInfo);
    deleteNote(token, _id);
  }

  return (
    <div className={`note-container ${noteColor && noteColor}`}>
      <div className="d-flex note-title-container">
        <h4> {title} </h4>
        <i
          className="fa-solid fa-thumbtack"
          onClick={() => handleTogglePinNote(token, _id)}
        ></i>
      </div>

      <small>{note}</small>

      <div className="d-flex mt-1 flex-wrap flex-gap-small">
        <small className="note-label-priority"> {priority} </small>

        {tags.map((tag) => {
          return <small className="note-label-priority"> {tag} </small>;
        })}
      </div>

      <div className="d-flex note-footer mt-1">
        <div className="d-flex note-footer note-label-priority-container">
          <small className="note-label-priority"> {createdAt} </small>
        </div>
        <div
          className={`d-flex note-footer ${
            location.pathname == "/archives"
              ? "archivenote-icons-container"
              : "note-icons-container"
          } `}
        >
          {location.pathname == "/" && (
            <i
              className="fa-solid fa-pencil"
              onClick={() => handleUpdateNote(_id)}
            ></i>
          )}

          {location.pathname == "/" && (
            <i
              className="fa-solid fa-box-archive"
              onClick={() => addNoteToArchives(token, noteInfo, _id)}
            ></i>
          )}

          {location.pathname !== "/" && (
            <i
              className="fa-solid fa-window-restore"
              onClick={() =>
                location.pathname == "/archives"
                  ? restoreNoteFromArchives(token, _id)
                  : handleRestoreNoteFromTrash(noteInfo, token)
              }
            ></i>
          )}

          <i
            className="fa-solid fa-trash-can"
            onClick={() =>
              location.pathname == "/archives"
                ? deleteNoteFromArchives(token, _id)
                : location.pathname == "/"
                ? handleAddNoteToTrash(noteInfo, _id, token)
                : deleteNoteFromTrash(_id)
            }
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
