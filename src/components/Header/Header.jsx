import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import hamburgerMenu from "../../assets/hamburger-menu.svg";
import closeIcon from "../../assets/modal-close-btn.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, setActiveModal, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const openLoginModal = () => {
    console.log("Opening Login Modal");
    setActiveModal("login");
    setIsMobileMenuOpened(false);
  };

  const openSignupModal = () => {
    console.log("Opening Signup Modal");
    setActiveModal("sign-up");
    setIsMobileMenuOpened(false);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "");

  const navigationClass = `header__navigation ${
    isMobileMenuOpened ? "header__navigation_opened" : ""
  }`;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/">
            <img className="header__logo" src={logo} alt="WTWR Logo" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData?.city || "Unknown Location"}
          </p>
        </div>
        <button
          type="button"
          className="header__menu-button"
          onClick={toggleMobileMenu}
        >
          <img
            src={isMobileMenuOpened ? closeIcon : hamburgerMenu}
            alt={isMobileMenuOpened ? "Close menu" : "Open menu"}
          />
        </button>
      </div>

      <nav className={navigationClass}>
        <div className="header__container-bar">
          <div className="header__switch">
            <ToggleSwitch />
          </div>

          {currentUser ? (
            <div className="header__user">
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>
              <Link
                to="/profile"
                className="header__link"
                onClick={() => setIsMobileMenuOpened(false)}
              >
                <div className="header__user-container">
                  <p className="header__user-name">
                    {currentUser?.name || "Guest"}
                  </p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser?.name || "Guest"}
                      className="header__avatar"
                    />
                  ) : (
                    <div className="header__avatar-placeholder">
                      {getInitials(currentUser?.name || "Guest")}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div className="header__auth">
              <button
                onClick={openLoginModal}
                type="button"
                className="header__auth-btn"
              >
                Log In
              </button>
              <button
                onClick={openSignupModal}
                type="button"
                className="header__auth-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
