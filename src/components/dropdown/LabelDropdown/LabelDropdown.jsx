import React, { useState } from "react";
import "./LabelDropdown.css";
import { useLabels } from "../../../context/labels-context";

function LabelDropdown({ setIsLabelDropdownOpen, isAddNewLabel }) {
  const [label, setLabel] = useState("");
  const token = localStorage.getItem("token");
  const { labels, setLabels } = useLabels();

  function handleAddNewLabel() {
    if (label) {
      setLabels([...labels, label]);
      setLabel("");
    }
  }

  return (
    <div className={`${isAddNewLabel && "playlist-dropdown-container"}`}>
      <ul
        className={`stacked-list list-style-none playlist-stacklist p-small ${
          isAddNewLabel ? "add-new-label-dropdown" : "select-label-dropdown"
        }`}
      >
        <li className="d-flex li-item playlist-li-item j-space-between border-none">
          <h5>Add labels</h5>
          <i
            className="fa-solid fa-rectangle-xmark cursor-p"
            onClick={() => setIsLabelDropdownOpen((prev) => !prev)}
          ></i>
        </li>

        <li className="d-flex li-item playlist-li-item border-none">
          <input
            type="text"
            placeholder="Create new label"
            className="playlist-dropdown-inp"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </li>

        {labels?.map((label) => {
          return (
            <li
              key={label}
              className="d-flex li-item playlist-li-item cursor-p"
            >
              <h5 className="ml-1">{label}</h5>
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
