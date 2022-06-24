import React from "react";
import "./FilterModal.css";
import { useLabels } from "../../../context/labels-context";
import { useNotes } from "../../../context/notes-context";

function FilterModal({ filterDispatch, filterState, setOpenFilterModal }) {
  const { labels } = useLabels();
  const { theme } = useNotes();

  return (
    <div className={`playlist-dropdown-container`}>
      <div
        className={`playlist-stacklist p-1 filter-modal-position filter-modal-container ${
          theme == "dark" && "modal-dark-theme"
        } `}
      >
        <div className={`d-flex j-space-between filter-heading-container mb-2`}>
          <h4 className="filter-heading m-bottom-small"> Filter </h4>
          <i
            className="fa-solid fa-rectangle-xmark cursor-p"
            onClick={() => setOpenFilterModal((prev) => !prev)}
          ></i>
        </div>

        <div>
          <h5 className="filter-input-heading mb-1">Sort by priority</h5>
          <div className="d-flex filter-inputs-container">
            <div className="d-flex filter-input-container">
              <input
                type="radio"
                checked={filterState.priorityHighToLow}
                onClick={() => filterDispatch({ type: "PRIORITY_HIGH_TO_LOW" })}
              />
              <label className="filter-label">High to low</label>
            </div>

            <div className="d-flex filter-input-container">
              <input
                type="radio"
                checked={filterState.priorityLowToHigh}
                onClick={() => filterDispatch({ type: "PRIORITY_LOW_TO_HIGH" })}
              />
              <label className="filter-label">Low to high</label>
            </div>
          </div>

          <h5 className="filter-input-heading mb-1">Sort by date</h5>
          <div className="d-flex filter-inputs-container">
            <div className="d-flex filter-input-container">
              <input
                type="radio"
                checked={filterState.sortByLatestDate}
                onClick={() => filterDispatch({ type: "SORT_DATE_BY_LATEST" })}
              />
              <label className="filter-label">Latest</label>
            </div>

            <div className="d-flex filter-input-container">
              <input
                type="radio"
                checked={filterState.sortByOldDate}
                onClick={() => filterDispatch({ type: "SORT_DATE_BY_OLDEST" })}
              />
              <label className="filter-label">Old</label>
            </div>
          </div>

          <h5 className="filter-input-heading mb-1">Filter by labels</h5>
          <div className="d-flex filter-label-container">
            {labels.map((label, index) => {
              return (
                <div key={index} className="d-flex filter-input-container">
                  <input
                    type="checkbox"
                    onClick={() =>
                      filterDispatch({
                        type: "FILTER_BY_LABELS",
                        payload: label,
                      })
                    }
                    checked={filterState.labels.some(
                      (filterLabels) => filterLabels == label
                    )}
                  />
                  <label className="filter-label"> {label} </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="d-flex li-item playlist-li-item j-content-right border-none">
          <button
            className="btn pri-cta-bg-clr playlist-create-btn-resize pri-btn-bg btn-small-size"
            onClick={() => filterDispatch({ type: "CLEAR_ALL_FILTERS" })}
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
