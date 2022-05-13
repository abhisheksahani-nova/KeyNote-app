import React from "react";
import "./FilterModal.css";

function FilterModal() {
  return (
    <div className={`playlist-dropdown-container`}>
      <div
        className={`playlist-stacklist p-1 filter-modal-position  filter-modal-container`}
      >
        <div className={`d-flex j-space-between border-none mb-2`}>
          <h4> Filter </h4>
          <i className="fa-solid fa-rectangle-xmark cursor-p"></i>
        </div>

        <div className="">
          <h5 className="filter-input-heading mb-1">Sort by priority</h5>
          <div className="d-flex filter-inputs-container">
            <div className="d-flex filter-input-container">
              <input type="radio" />
              <label className="filter-label">High to low</label>
            </div>

            <div className="d-flex filter-input-container">
              <input type="radio" />
              <label className="filter-label">Low to high</label>
            </div>
          </div>

          <h5 className="filter-input-heading mb-1">Sort by date</h5>
          <div className="d-flex filter-inputs-container">
            <div className="d-flex filter-input-container">
              <input type="radio" />
              <label className="filter-label">Latest</label>
            </div>

            <div className="d-flex filter-input-container">
              <input type="radio" />
              <label className="filter-label">Old</label>
            </div>
          </div>

          <h5>Filter by labels</h5>
          <div className="">
            <div className="">
              <input type="checkbox" />
              <label className="filter-label">Travel</label>
            </div>
            <div className="">
              <input type="checkbox" />
              <label className="filter-label">Coding</label>
            </div>
          </div>
        </div>

        {/* <li className="d-flex li-item playlist-li-item border-none">
          <input
            type="text"
            placeholder="Create new label"
            className="playlist-dropdown-inp"
          />
        </li> */}

        <div className="d-flex li-item playlist-li-item j-content-right border-none">
          <button
            className="btn pri-cta-bg-clr playlist-create-btn-resize"
            onClick={() => handleAddNewLabel()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
