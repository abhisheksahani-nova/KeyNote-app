import React, { useState } from "react";
import "./LabelDropdown.css";

function LabelDropdown({ }) {
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);

  const [playListInfo, setPlaylistInfo] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  return (
    <div className="playlist-dropdown-container">
      <ul className="stacked-list list-style-none playlist-stacklist">
        <li className="d-flex li-item playlist-li-item j-space-between">
          {<h5>Add</h5>}
          <i className="fa-solid fa-rectangle-xmark cursor-p"></i>
        </li>

        {/* { []?.map((playlist) => {
            return (
              <li
                key={playlist._id}
                className="d-flex li-item playlist-li-item cursor-p"
                onClick={() =>
                  // handleAddNewVideoToPlaylist(video, playlist._id, token)
                }
              >
                <h5>{playlist.title}</h5>
              </li>
            );
          })} */}

        <li
          className="d-flex li-item playlist-li-item cursor-p"
          //
        >
          <i className="fa-solid fa-plus playlist-add-icon"></i>
          <h5>Create New Playlist</h5>
        </li>

        <li className="d-flex li-item playlist-li-item">
          <input
            type="text"
            placeholder="title"
            className="playlist-dropdown-inp"
            value={playListInfo.title}
            onChange={(e) =>
              setPlaylistInfo({
                ...playListInfo,
                title: e.target.value,
              })
            }
          />
        </li>

        <li className="d-flex li-item playlist-li-item">
          <input
            type="text"
            placeholder="description"
            className="playlist-dropdown-inp"
            value={playListInfo.description}
            onChange={(e) =>
              setPlaylistInfo({
                ...playListInfo,
                description: e.target.value,
              })
            }
          />
        </li>

        <li className="d-flex li-item playlist-li-item j-content-right">
          <button className="btn pri-cta-bg-clr playlist-create-btn-resize">
            Create
          </button>
        </li>
      </ul>
    </div>
  );
}

export default LabelDropdown;
