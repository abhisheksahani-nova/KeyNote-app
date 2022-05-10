import React from "react";
import "./Navbar.css";

function Navbar() {
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

      <div className="nav-innerContainer nav-icon-container width-reset inherit-clr mr-1">
        <div className="flex-col-center">
          <a className="font-clr" href="#">
            <i className="fa-solid fa-heart"></i>
          </a>
          <small>Wishlist</small>
        </div>

        <div className="flex-col-center">
          <a className="font-clr" href="#">
            <i className="fa-solid fa-user"></i>
          </a>
          <small>Profile</small>
        </div>

        <div className="flex-col-center">
          <a className="font-clr nav-icon" href="#">
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
          <small>Cart</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
