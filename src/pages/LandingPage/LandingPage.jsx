import React from "react";
import { Navbar } from "../../components/index";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div>
      <Navbar isLanding={true} />
      <section className="d-flex align-item-center justify-content-center  landingpage-main-container">
        <div className="d-flex landingpage-content-container ">
          <i className="fa-solid fa-file file-icon"></i>

          <div className="d-flex flex-direction-col gap-2">
            <h1 className="landingpage-content mt-1">
              Save your note the <span className="blue-text-clr">easier</span>{" "}
              way with <span className="orange-text-clr">KeyNote</span> & make
              your neurons dataless.
            </h1>
            <button className="btn pri-outline-btn width-max-content">
              Join Now!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
