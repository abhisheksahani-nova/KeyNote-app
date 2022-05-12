import React, { useState } from "react";
import "./LabelDropdown.css";
import { useLabels } from "../../../context/labels-context";
import { useNotes } from "../../../context/notes-context";

function LabelDropdown({
  setIsLabelDropdownOpen,
  setIsSelectLabelDropdownOpen,
  isAddNewLabel,
  noteData,
  setNoteData,
  noteId,
  isUpdateNote,
}) {
  const [label, setLabel] = useState("");
  const [isUpdateChecked, setIsUpdateChecked] = useState(true);
  const token = localStorage.getItem("token");
  const { labels, setLabels } = useLabels();
  const { notes } = useNotes();
  const [checkedState, setCheckedState] = useState(
    new Array(labels.length).fill(false)
  );

  function findUpdateNote() {
    const findNoteToUpdate = notes.filter((note) => note._id == noteId);
    return findNoteToUpdate[0]?.tags;
  }

  if (isUpdateNote && isUpdateChecked) {
    const updateNoteLabels = findUpdateNote();
    const updateNoteCheckedState = [];

    for (let label of labels) {
      let checkedFlag = false;
      for (let updateLabel of updateNoteLabels) {
        if (label == updateLabel) {
          checkedFlag = true;
        }
      }
      updateNoteCheckedState.push(checkedFlag);
    }

    setCheckedState(updateNoteCheckedState);
    setIsUpdateChecked((prev) => !prev);
  }

  function handleAddNewLabel() {
    if (label) {
      setLabels([...labels, label]);
      setLabel("");
    }
  }

  function handleAddLabelToNote(e, label, position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index == position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    if (e.target.checked) {
      setNoteData({ ...noteData, tags: [...noteData.tags, label] });
    } else {
      const filterLabel = noteData.tags.filter((tag) => tag !== label);
      setNoteData({ ...noteData, tags: [...filterLabel] });
    }
  }

  return (
    <div className={`${isAddNewLabel && "playlist-dropdown-container"}`}>
      <ul
        className={`stacked-list list-style-none playlist-stacklist p-small ${
          isAddNewLabel ? "add-new-label-dropdown" : "select-label-dropdown"
        }`}
      >
        <li
          className={`d-flex li-item playlist-li-item j-space-between border-none ${
            !isAddNewLabel && "mb-1"
          }`}
        >
          <h5> {isAddNewLabel ? "Add labels" : "Label note"} </h5>
          <i
            className="fa-solid fa-rectangle-xmark cursor-p"
            onClick={() =>
              isAddNewLabel
                ? setIsLabelDropdownOpen((prev) => !prev)
                : setIsSelectLabelDropdownOpen((prev) => !prev)
            }
          ></i>
        </li>

        {isAddNewLabel && (
          <li className="d-flex li-item playlist-li-item border-none">
            <input
              type="text"
              placeholder="Create new label"
              className="playlist-dropdown-inp"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </li>
        )}

        {isAddNewLabel
          ? labels?.map((label) => {
              return (
                <li
                  key={label}
                  className="d-flex li-item playlist-li-item cursor-p"
                >
                  <h5 className="ml-1 break-word">{label}</h5>
                </li>
              );
            })
          : labels?.map((label, index) => {
              return (
                <li
                  key={label}
                  className="d-flex li-item playlist-li-item cursor-p align-item-center"
                >
                  <input
                    type="checkbox"
                    checked={checkedState[index]}
                    onClick={(e) => handleAddLabelToNote(e, label, index)}
                  />
                  <label
                    className="ml-1 select-label-fontsize break-word"
                    htmlFor=""
                  >
                    {label}
                  </label>
                </li>
              );
            })}

        {isAddNewLabel && (
          <li className="d-flex li-item playlist-li-item j-content-right border-none">
            <button
              className="btn pri-cta-bg-clr playlist-create-btn-resize"
              onClick={() => handleAddNewLabel()}
            >
              Add
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default LabelDropdown;
