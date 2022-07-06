import React from "react";
import "./ColorSelector.css";
import colorSelector from "../../../utils/ColorSelectorData";
import { useNotes } from "../../../context/notes-context";

function ColorSelector({ noteData, setNoteData, setShowColorSelector }) {
  const { theme } = useNotes();

  function handleColorSelection(colorBox) {
    setNoteData({ ...noteData, noteColor: colorBox.colorClass });
    setShowColorSelector((prev) => !prev);
  }

  return (
    <div
      className={`d-flex p-absolute color-selector-container ${
        theme == "dark" && "color-selector-container-dark"
      }`}
    >
      {colorSelector.map((colorBox) => {
        return (
          <div
            key={colorBox._id}
            onClick={() => handleColorSelection(colorBox)}
          ></div>
        );
      })}
    </div>
  );
}

export default ColorSelector;
