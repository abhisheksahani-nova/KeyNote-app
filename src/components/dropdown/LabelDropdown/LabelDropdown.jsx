import React, { useState } from "react";
import "./LabelDropdown.css";
import { useLabels } from "../../../context/labels-context";

function LabelDropdown({
  setIsLabelDropdownOpen,
  setIsSelectLabelDropdownOpen,
  isAddNewLabel,
  noteData,
  setNoteData,
}) {
  const [label, setLabel] = useState("");
  const token = localStorage.getItem("token");
  const { labels, setLabels } = useLabels();

  function handleAddNewLabel() {
    if (label) {
      setLabels([...labels, label]);
      setLabel("");
    }
  }

  function handleAddLabelToNote(e, label) {
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
          : labels?.map((label) => {
              return (
                <li
                  key={label}
                  className="d-flex li-item playlist-li-item cursor-p align-item-center"
                >
                  <input
                    type="checkbox"
                    onClick={(e) => handleAddLabelToNote(e, label)}
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

        <li className="d-flex li-item playlist-li-item j-content-right border-none">
          <button
            className="btn pri-cta-bg-clr playlist-create-btn-resize"
            onClick={() => handleAddNewLabel()}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  );
}

export default LabelDropdown;
