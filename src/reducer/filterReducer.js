import { useReducer } from "react";

const initialState = {
  priorityLowToHigh: false,
  priorityHighToLow: false,
  sortByLatestDate: false,
  sortByOldDate: false,
  labels: [],
};

function filterReducer(state, action) {
  switch (action.type) {
    case "PRIORITY_LOW_TO_HIGH":
      return {
        ...state,
        priorityLowToHigh: !state.priorityLowToHigh,
        priorityHighToLow: false,
      };

    case "PRIORITY_HIGH_TO_LOW":
      return {
        ...state,
        priorityHighToLow: !state.priorityHighToLow,
        priorityLowToHigh: false,
      };

    case "SORT_DATE_BY_LATEST":
      return {
        ...state,
        sortByLatestDate: !state.sortByLatestDate,
        sortByOldDate: false,
      };

    case "SORT_DATE_BY_OLDEST":
      return {
        ...state,
        sortByOldDate: !state.sortByOldDate,
        sortByLatestDate: false,
      };

    case "FILTER_BY_LABELS":
      return state.labels.includes(action.payload)
        ? {
            ...state,
            labels: state.labels.filter((label) => label !== action.payload),
          }
        : { ...state, labels: [...state.labels, action.payload] };

    case "CLEAR_ALL_FILTERS":
      return  initialState;

    default:
      return state;
  }
}

function applyFilters(state, getNotes) {
  let filteredNotes = getNotes();

  if (state.sortByLatestDate) {
    filteredNotes = filteredNotes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (state.sortByOldDate) {
    filteredNotes = filteredNotes.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  if (state.priorityLowToHigh) {
    filteredNotes = filteredNotes.sort(
      (a, b) => a.priorityRank - b.priorityRank
    );
  }

  if (state.priorityHighToLow) {
    filteredNotes = filteredNotes.sort(
      (a, b) => b.priorityRank - a.priorityRank
    );
  }

  if (state.labels.length) {
    filteredNotes = filteredNotes.filter(({ tags }) =>
      tags.some((tag) => state.labels.includes(tag))
    );
  }
  return filteredNotes;
}

const useFilter = () => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialState);

  return { filterState, filterDispatch };
};

export { useFilter, applyFilters };
