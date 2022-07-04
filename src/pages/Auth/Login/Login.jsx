import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import { useNotes } from "../../../context/notes-context";

function Login() {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [checkLogin, setCheckLogin] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const { theme, loginUser, guestLogin } = useNotes();

  function handleUserLogin() {
    setCheckLogin(true);

    if (userLoginData.email && userLoginData.password) {
      loginUser(userLoginData);
    }
  }

  return (
    <section className="login_form_container d-flex">
      <div
        className={`card-basic login_form ${
          theme == "dark" && "modal-dark-theme"
        } `}
      >
        <h2 className="t-align-center mt-2 mb-2">Login</h2>
        <div className="inp-container mb-1">
          <label className="inp-label d-block inp-label-required login_inp_label_resize inherit-clr">
            Email
          </label>
          <input
            className={`inp login_inp_resize ecommerce-login-inp outline-none ${
              theme == "dark" && "modal-dark-theme note-create-inp-border"
            }`}
            id="inp-email"
            placeholder="Enter your email"
            value={userLoginData.email}
            onChange={(e) => {
              setUserLoginData({ ...userLoginData, email: e.target.value });
              setCheckLogin(false);
            }}
          />

          {!userLoginData.email && checkLogin && (
            <div className="err-msg-container">
              <span>
                <i className="fa fa-exclamation-circle err-icon"></i>Enter your
                email!
              </span>
            </div>
          )}
        </div>

        <div className="inp-container mb-1">
          <label className="inp-label d-block inp-label-required login_inp_label_resize inherit-clr">
            Password
          </label>
          <input
            type={passwordInputType}
            className={`inp login_inp_resize ecommerce-login-inp outline-none ${
              theme == "dark" && "modal-dark-theme note-create-inp-border"
            }`}
            id="inp-password"
            placeholder="Enter your password"
            value={userLoginData.password}
            onChange={(e) => {
              setUserLoginData({ ...userLoginData, password: e.target.value });
              setCheckLogin(false);
            }}
          />

          {passwordInputType == "password" ? (
            <i
              className="fa-solid fa-eye login-inp-icon"
              onClick={() => setPasswordInputType("text")}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash login-inp-icon"
              onClick={() => setPasswordInputType("password")}
            ></i>
          )}

          {!userLoginData.password && checkLogin && (
            <div className="err-msg-container">
              <span>
                <i className="fa fa-exclamation-circle err-icon"></i>Enter your
                password!
              </span>
            </div>
          )}
        </div>

        <div className="inp-container mb-1">
          <div className="d-flex login_checkbox_inp_container">
            <input type="checkbox" id="checkbox-termsPolicy" />
            <label className="inp-label login-checkbox-label-size inherit-clr">
              Remember Me
            </label>
          </div>
        </div>

        <div className="inp-container ml-1 mb-1">
          <button
            className={`btn pri-outline-btn guest-login-btn mb-1 ${
              theme == "dark" && "modal-dark-theme"
            }`}
            type="button"
            onClick={() => guestLogin()}
          >
            Guest login
          </button>

          <button
            className="btn login_custom_btn pri-btn-style"
            type="button"
            onClick={() => handleUserLogin()}
          >
            Login
          </button>
        </div>

        <div className="inp-container t-align-center mb-2">
          <NavLink className="t-decoration-none" to="/signup">
            <small className="create_acc_link">Create New Account</small>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Login;
