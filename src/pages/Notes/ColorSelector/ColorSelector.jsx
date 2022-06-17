import React from "react";
import "./ColorSelector.css";
import colorSelector from "../../../utils/ColorSelectorData";

function ColorSelector({ noteData, setNoteData, setShowColorSelector }) {
  function handleColorSelection(colorBox) {
    setNoteData({ ...noteData, noteColor: colorBox.colorClass });
    setShowColorSelector((prev) => !prev);
  }

  return (
    <div className="d-flex p-absolute color-selector-container">
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
