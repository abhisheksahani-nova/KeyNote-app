import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="videolib-drawer-container">
      <ul className="videolib-list">
        <li
          className="videolib-list-item sidebar-list"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-lightbulb videolib-drawer-icon"></i> Notes
        </li>
        <li className="videolib-list-item sidebar-list">
          <i className="fa-solid fa-tag videolib-drawer-icon"></i> Labels
        </li>
        <li
          className="videolib-list-item sidebar-list"
          onClick={() => navigate("/archives")}
        >
          <i className="fa-solid fa-box-archive videolib-drawer-icon"></i>{" "}
          Archive
        </li>
        <li className="videolib-list-item sidebar-list" onClick={() => navigate("/trash")} >
          <i className="fa-solid fa-trash-can videolib-drawer-icon"></i> Trash
        </li>
        <li className="videolib-list-item sidebar-list">
          <i className="fa-solid fa-pencil videolib-drawer-icon"></i>
          Edit labels
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
