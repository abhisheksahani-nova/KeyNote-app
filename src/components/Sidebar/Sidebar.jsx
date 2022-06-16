import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotes } from "../../context/notes-context";

function Sidebar() {
  const [windowWidth, setWindowWidth] = useState();
  const { theme } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="videolib-drawer-container">
      <ul className="videolib-list">
        <li
          className={`videolib-list-item sidebar-list ${
            theme == "dark" && "dark-theme-font-clr"
          }`}
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-lightbulb videolib-drawer-icon"></i>
          {windowWidth > 655 && "Notes"}
        </li>
        <li
          className={`videolib-list-item sidebar-list ${
            theme == "dark" && "dark-theme-font-clr"
          }`}
        >
          <i className="fa-solid fa-tag videolib-drawer-icon"></i>{" "}
          {windowWidth > 655 && "Labels"}
        </li>
        <li
          className={`videolib-list-item sidebar-list ${
            theme == "dark" && "dark-theme-font-clr"
          }`}
          onClick={() => navigate("/archives")}
        >
          <i className="fa-solid fa-box-archive videolib-drawer-icon"></i>{" "}
          {windowWidth > 655 && "Archive"}
        </li>
        <li
          className={`videolib-list-item sidebar-list ${
            theme == "dark" && "dark-theme-font-clr"
          }`}
          onClick={() => navigate("/trash")}
        >
          <i className="fa-solid fa-trash-can videolib-drawer-icon"></i>{" "}
          {windowWidth > 655 && "Trash"}
        </li>
        <li
          className={`videolib-list-item sidebar-list ${
            theme == "dark" && "dark-theme-font-clr"
          }`}
        >
          <i className="fa-solid fa-pencil videolib-drawer-icon"></i>
          {windowWidth > 655 && "Edit labels"}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
