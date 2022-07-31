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
import { useNavigate } from "react-router-dom";
import { useLabels } from "../../context/labels-context";
import { toast } from "react-toastify";

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

  const { notes, addNewNote, updateNote, theme } = useNotes();
  const { filterState, filterDispatch } = useFilter();
  const { labels } = useLabels();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    } else {
      if (noteData.title) {
        addNewNote(token, noteData);
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
      } else {
        toast("Add title to note", { type: "message" });
      }
    }
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

  function handleCloseCreateNoteBox() {
    setOpenCreateNote((prev) => !prev);
    setIsUpdateNote((prev) => !prev);

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

  return (
    <div>
      <Navbar />
      <section className="d-flex">
        <Sidebar setIsLabelDropdownOpen={setIsLabelDropdownOpen} />
        {isLabelDropdownOpen && (
          <LabelDropdown
            setIsLabelDropdownOpen={setIsLabelDropdownOpen}
            setIsSelectLabelDropdownOpen={setIsSelectLabelDropdownOpen}
            isAddNewLabel={true}
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
          <div className="d-flex align-items-start mb-2">
            {openCreateNote ? (
              <div
                className={`create-note-container p-relative ${
                  theme == "dark" && "note-create-inp-border"
                }`}
              >
                <div className="d-flex title-inp-container mb-2">
                  <input
                    onChange={(e) =>
                      setNoteData({ ...noteData, title: e.target.value })
                    }
                    value={noteData.title}
                    className={`note-title-inp ${
                      theme == "dark" && "create-note-inp-dark-clr"
                    }`}
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
                    setShowColorSelector={setShowColorSelector}
                  />
                )}

                {isSelectLabelDropdownOpen &&
                  (labels.length > 0 ? (
                    <LabelDropdown
                      setIsLabelDropdownOpen={setIsLabelDropdownOpen}
                      setIsSelectLabelDropdownOpen={
                        setIsSelectLabelDropdownOpen
                      }
                      isAddNewLabel={false}
                      noteData={noteData}
                      setNoteData={setNoteData}
                      noteId={noteId}
                      isUpdateNote={isUpdateNote}
                    />
                  ) : (
                    <LabelDropdown
                      setIsLabelDropdownOpen={setIsLabelDropdownOpen}
                      setIsSelectLabelDropdownOpen={
                        setIsSelectLabelDropdownOpen
                      }
                      isAddNewLabel={true}
                    />
                  ))}

                <TextareaAutosize
                  className={`create-note-textarea ${
                    theme == "dark" && "create-note-inp-dark-clr"
                  }`}
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
                      className={`note-priority-dropdown ${
                        theme == "dark" &&
                        "nav-inp-dark-clr note-create-inp-border white-clr"
                      }`}
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
                      className="fa-solid fa-palette"
                      onClick={() => setShowColorSelector((prev) => !prev)}
                    ></i>

                    <i
                      className="fa-solid fa-face-smile"
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
                      onClick={() => handleCloseCreateNoteBox()}
                      className={`btn btn-outline btn-small-size pri-outline-btn ${
                        theme == "dark" && "pri-outline-btn-dark"
                      }`}
                    >
                      Close
                    </button>
                    <button
                      className="btn pri-btn-style btn-small-size"
                      onClick={() =>
                        token
                          ? handleSaveNote(token, noteData, noteId)
                          : navigate("/login")
                      }
                    >
                      {isUpdateNote ? "Edit" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <input
                onClick={() => setOpenCreateNote((prev) => !prev)}
                className={`nav_searchBar add-note-inp ${
                  theme == "dark" &&
                  "create-note-inp-dark-clr note-create-inp-border"
                }`}
                type="text"
                placeholder="Take a note..."
              />
            )}

            {windowWidth < 655 ? (
              <button
                className={`btn pri-btn-style pri-outline-btn mr-1 btn-label-responsive-sty ${
                  theme == "dark" && "pri-outline-btn-dark"
                }`}
                onClick={() =>
                  token
                    ? setIsLabelDropdownOpen((prev) => !prev)
                    : navigate("/login")
                }
              >
                <i class="fa-solid fa-list-check notes-btn-icon-resize"></i>
              </button>
            ) : (
              <button
                className={`btn pri-btn-style pri-outline-btn mr-1 ${
                  theme == "dark" && "pri-outline-btn-dark"
                } `}
                onClick={() =>
                  token
                    ? setIsLabelDropdownOpen((prev) => !prev)
                    : navigate("/login")
                }
              >
                Add label
              </button>
            )}

            <button
              className={`btn pri-btn-style btn-filter-responsive-sty ${
                windowWidth <= 500 &&
                theme == "dark" &&
                "pri-outline-btn pri-outline-btn-dark"
              }`}
              onClick={() =>
                token ? setOpenFilterModal((prev) => !prev) : navigate("/login")
              }
            >
              {windowWidth > 500 ? (
                "Filter"
              ) : (
                <i class="fa-solid fa-filter notes-btn-icon-resize"></i>
              )}
            </button>
          </div>

          {allPinnedNotes?.length > 0 || allOtherNotes?.length > 0 ? (
            <div>
              {allPinnedNotes?.length > 0 && (
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
              )}
              {allOtherNotes?.length > 0 && (
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
              )}
            </div>
          ) : (
            <div className="d-flex align-item-center mt-5">
              <div className="d-flex flex-direction-col gap-1 empty-note-icon-cont">
                <i
                  class={`fa-solid fa-file empty-note-icon ${
                    theme == "dark" && "empty-icon-dark-clr"
                  }`}
                ></i>
                <button
                  className={`btn pri-outline-btn ${
                    theme == "dark" && "pri-outline-btn-dark"
                  }`}
                  onClick={() => setOpenCreateNote((prev) => !prev)}
                >
                  Add notes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Notes;
