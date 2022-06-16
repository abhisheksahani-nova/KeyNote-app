import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../context/notes-context";

function Navbar() {
  const { theme, setTheme } = useNotes();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleAuth() {
    if (token) {
      localStorage.clear();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  function handleThemeChange() {
    setTheme((theme) => (theme == "light" ? "dark" : "light"));
  }

  return (
    <nav className="nav-bar white mb-0 nav-border-bottom">
      <div className={`nav-innerContainer ${theme == "light" && "font-clr"}`}>
        <h2 className="nav-heading mr-4 nav-heading-restyle">KeyNote</h2>
      </div>

      <div className="nav-innerContainer font-clr width-auto nav-input-container">
        <span
          className={`searchBar_icon searchBar-custom-sty ${
            theme == "dark" && "nav-inp-dark-clr"
          }`}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          className={`nav_searchBar nav-inputbox border-none ${
            theme == "dark" && "nav-inp-dark-clr"
          }`}
          placeholder="Search"
          type="text"
        />
      </div>

      <div>
        <i class="fa-solid fa-sun" onClick={() => handleThemeChange()}></i>

        <button
          className="btn pri-btn-style mr-2 ml-2 login-btn"
          onClick={() => handleAuth()}
        >
          {token ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
