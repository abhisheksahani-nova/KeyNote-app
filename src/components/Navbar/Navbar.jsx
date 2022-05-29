import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar white mb-0 nav-border-bottom">
      <div className="nav-innerContainer font-clr">
        <h2 className="nav-heading mr-4 nav-heading-restyle">Note</h2>
      </div>

      <div className="nav-innerContainer font-clr width-auto nav-input-container">
        <span className="searchBar_icon searchBar-custom-sty">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          className="nav_searchBar nav-inputbox border-none"
          placeholder="Search"
          type="text"
        />
      </div>

      <button className="btn pri-btn-style mr-2 login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
    </nav>
  );
}

export default Navbar;
