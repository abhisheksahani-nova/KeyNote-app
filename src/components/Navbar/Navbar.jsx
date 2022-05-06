import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav class="nav-bar white mb-0 nav-border-bottom">
      <div class="nav-innerContainer font-clr">
        <h2 class="nav-heading mr-4 nav-heading-restyle">Note</h2>
      </div>

      <div class="nav-innerContainer font-clr width-auto nav-input-container">
        <span class="searchBar_icon searchBar-custom-sty">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          class="nav_searchBar nav-inputbox border-none"
          placeholder="Search"
          type="text"
        />
      </div>

      <div class="nav-innerContainer nav-icon-container width-reset inherit-clr mr-1">
        <div class="flex-col-center">
          <a class="font-clr" href="#">
            <i class="fa-solid fa-heart"></i>
          </a>
          <small>Wishlist</small>
        </div>

        <div class="flex-col-center">
          <a class="font-clr" href="#">
            <i class="fa-solid fa-user"></i>
          </a>
          <small>Profile</small>
        </div>

        <div class="flex-col-center">
          <a class="font-clr nav-icon" href="#">
            <i class="fa-solid fa-cart-shopping"></i>
          </a>
          <small>Cart</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
