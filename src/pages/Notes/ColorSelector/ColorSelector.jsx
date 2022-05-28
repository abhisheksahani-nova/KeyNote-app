import React from "react";
import "./ColorSelector.css";
import colorSelector from "../../../utils/ColorSelectorData";

function ColorSelector({ noteData, setNoteData }) {
  return (
    <div className="d-flex p-absolute color-selector-container">
      {colorSelector.map((colorBox) => {
        return (
          <div
            key={colorBox._id}
            onClick={() =>
              setNoteData({ ...noteData, noteColor: colorBox.colorClass })
            }
          ></div>
        );
      })}
    </div>
  );
}

export default ColorSelector;
