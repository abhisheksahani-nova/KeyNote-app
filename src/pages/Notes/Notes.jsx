import React, { useState, useEffect } from "react";
import {
  Navbar,
  Sidebar,
  NoteCard,
  LabelDropdown,
} from "../../components/index";
import "./Notes.css";
import { useNotes } from "../../context/notes-context";
import TextareaAutosize from "react-textarea-autosize";
import FilterModal from "./FilterModal/FilterModal";
import { formatDate } from "../../backend/utils/authUtils";
import { useFilter, applyFilters } from "../../reducer/filterReducer";
import ColorSelector from "./ColorSelector/ColorSelector";
import Picker from "emoji-picker-react";

function Notes() {
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [isSelectLabelDropdownOpen, setIsSelectLabelDropdownOpen] =
    useState(false);
  const [openCreateNote, setOpenCreateNote] = useState(false);
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUpdateNote, setIsUpdateNote] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [noteData, setNoteData] = useState({
    title: "",
    note: "",
    priority: "low",
    priorityRank: 1,
    isPinned: false,
    tags: [],
    createdAt: formatDate(),
    noteColor: "",
  });

  const { notes, addNewNote, updateNote } = useNotes();
  const { filterState, filterDispatch } = useFilter();
  const token = localStorage.getItem("token");

  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function pinnedNotes() {
    let temp = notes;
    return temp.filter((note) => note.isPinned);
  }

  function otherNotes() {
    let temp = notes;
    return temp.filter((note) => !note.isPinned);
  }

  function handleSaveNote(token, noteData, noteId) {
    if (isUpdateNote) {
      updateNote(token, noteData, noteId);
      setIsUpdateNote((prev) => !prev);
    } else {
      addNewNote(token, noteData);
    }

    setOpenCreateNote((prev) => !prev);
    setNoteData({
      title: "",
      note: "",
      priority: "low",
      priorityRank: 1,
      isPinned: false,
      tags: [],
      createdAt: formatDate(),
      noteColor: "",
    });
  }

  function handlePriorityData(e) {
    let priority = e.target.value;
    let priorityRanking;

    if (priority == "high") {
      priorityRanking = 3;
    } else if (priority == "medium") {
      priorityRanking = 2;
    } else if (priority == "low") {
      priorityRanking = 1;
    }

    setNoteData({
      ...noteData,
      priority: e.target.value,
      priorityRank: priorityRanking,
    });
  }

  const allPinnedNotes = applyFilters(filterState, pinnedNotes);
  const allOtherNotes = applyFilters(filterState, otherNotes);

  function onEmojiClick(event, emojiObject) {
    setNoteData({ ...noteData, note: noteData.note + emojiObject.emoji });
  }

  const colorpickerStyle = {
    width: "18rem",
    position: "absolute",
    top: "9.5rem",
    left: "18rem",
  };

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar />
        {isLabelDropdownOpen && (
          <LabelDropdown
            setIsLabelDropdownOpen={setIsLabelDropdownOpen}
            setIsSelectLabelDropdownOpen={setIsSelectLabelDropdownOpen}
            isAddNewLabel={true}
          />
        )}

        {isSelectLabelDropdownOpen && (
          <LabelDropdown
            setIsLabelDropdownOpen={setIsLabelDropdownOpen}
            setIsSelectLabelDropdownOpen={setIsSelectLabelDropdownOpen}
            isAddNewLabel={false}
            noteData={noteData}
            setNoteData={setNoteData}
            noteId={noteId}
            isUpdateNote={isUpdateNote}
          />
        )}

        {openFilterModal && (
          <FilterModal
            filterDispatch={filterDispatch}
            filterState={filterState}
            setOpenFilterModal={setOpenFilterModal}
          />
        )}

        <div className="notes-container">
          <div className="d-flex align-items-start mb-2 p-relative">
            {openCreateNote ? (
              <div className="create-note-container">
                <div className="d-flex title-inp-container mb-2">
                  <input
                    onChange={(e) =>
                      setNoteData({ ...noteData, title: e.target.value })
                    }
                    value={noteData.title}
                    className="note-title-inp"
                    type="text"
                    placeholder="Title"
                  />
                  <i
                    className="fa-solid fa-thumbtack"
                    onClick={() =>
                      setNoteData({ ...noteData, isPinned: !noteData.isPinned })
                    }
                  ></i>
                </div>

                {showColorSelector && (
                  <ColorSelector
                    noteData={noteData}
                    setNoteData={setNoteData}
                  />
                )}

                <TextareaAutosize
                  className="create-note-textarea"
                  placeholder="Take a note..."
                  onChange={(e) =>
                    setNoteData({ ...noteData, note: e.target.value })
                  }
                  value={noteData.note}
                />

                <div className="d-flex note-footer mt-2">
                  <div className="d-flex note-footer create-note-footer-icons-container">
                    <select
                      onChange={(e) => handlePriorityData(e)}
                      value={noteData.priority}
                      className="note-priority-dropdown"
                    >
                      <optgroup className="select-option-sty">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                      </optgroup>
                    </select>
                    <i
                      className="fa-solid fa-tag"
                      onClick={() =>
                        setIsSelectLabelDropdownOpen((prev) => !prev)
                      }
                    ></i>

                    <i
                      class="fa-solid fa-palette"
                      onClick={() => setShowColorSelector((prev) => !prev)}
                    ></i>

                    <i
                      class="fa-solid fa-face-smile"
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                    ></i>

                    {showEmojiPicker && (
                      <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={colorpickerStyle}
                      />
                    )}
                  </div>
                  <div className="d-flex note-footer note-label-priority-container create-note-btn-container">
                    <button
                      onClick={() => setOpenCreateNote((prev) => !prev)}
                      className="btn btn-outline btn-small-size pri-outline-btn"
                    >
                      Close
                    </button>
                    <button
                      className="btn pri-btn-style btn-small-size"
                      onClick={() => handleSaveNote(token, noteData, noteId)}
                    >
                      Save
                    </button>
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

            {windowWidth < 655 ? (
              <button
                className="btn pri-btn-style pri-outline-btn mr-1 btn-label-responsive-sty"
                onClick={() => setIsLabelDropdownOpen((prev) => !prev)}
              >
                <i class="fa-solid fa-list-check notes-btn-icon-resize"></i>
              </button>
            ) : (
              <button
                className="btn pri-btn-style pri-outline-btn mr-1"
                onClick={() => setIsLabelDropdownOpen((prev) => !prev)}
              >
                Add label
              </button>
            )}

            <button
              className={`btn pri-btn-style btn-filter-responsive-sty ${
                windowWidth <= 500 && "pri-outline-btn"
              }`}
              onClick={() => setOpenFilterModal((prev) => !prev)}
            >
              {windowWidth > 500 ? (
                "Filter"
              ) : (
                <i class="fa-solid fa-filter notes-btn-icon-resize"></i>
              )}
            </button>
          </div>

          <div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                PINNED
              </small>
              <div className="d-flex notecard-container">
                {allPinnedNotes?.map((pinnedNote) => {
                  return (
                    <NoteCard
                      key={pinnedNote._id}
                      noteInfo={pinnedNote}
                      setNoteData={setNoteData}
                      setNoteId={setNoteId}
                      setIsUpdateNote={setIsUpdateNote}
                      setOpenCreateNote={setOpenCreateNote}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <small className="font-size-small ml-1 f-weight-500">
                OTHERS
              </small>
              <div className="d-flex notecard-container">
                {allOtherNotes.map((otherNote) => {
                  return (
                    <NoteCard
                      key={otherNote._id}
                      noteInfo={otherNote}
                      setNoteData={setNoteData}
                      setNoteId={setNoteId}
                      setIsUpdateNote={setIsUpdateNote}
                      setOpenCreateNote={setOpenCreateNote}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notes;
