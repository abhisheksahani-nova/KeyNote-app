import React, { useState } from "react";
import "./Profile.css";
import { Navbar, Sidebar } from "../../components/index";

const defaultProfilePic =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

function Profile() {
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profilePic") || ""
  );

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
        localStorage.setItem("profilePic", reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div>
      <Navbar />
      <section className="d-flex gap-4 responsive-gap">
        <Sidebar />

        <div className="profile-page-container card-basic profile-card mt-2">
          <div className="d-flex j-space-between align-items-start">
            <div className="d-flex mb-2 p-relative">
              <img
                className="avatar md object-fit-cover"
                alt="user avatar"
                src={profileImg ? profileImg : defaultProfilePic}
              />

              <label htmlFor="input-img">
                <i className={`fa-solid fa-camera select-img-icon`}></i>
              </label>

              <input
                className="d-none"
                type="file"
                accept="image/*"
                id="input-img"
                onChange={(e) => imageHandler(e)}
              />
            </div>
          </div>

          {username && (
            <div className="d-flex gap-small">
              <label className="inp-label d-block login_inp_label_resize inherit-clr mb-1">
                Name :
              </label>

              <label className="inp-label d-block login_inp_label_resize inherit-clr mb-1 word-wrap">
                {" "}
                {username}{" "}
              </label>
            </div>
          )}

          <div className="d-flex gap-small">
            <label className="inp-label d-block login_inp_label_resize inherit-clr mb-1">
              Email :
            </label>

            <label className="inp-label d-block login_inp_label_resize inherit-clr mb-1 word-wrap">
              {email}
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
