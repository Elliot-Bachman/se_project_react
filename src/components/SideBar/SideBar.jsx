import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar({ openSignOutModal, openProfileEditModal }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar logo" />
      <p className="sidebar__username">Terrence Tegegne</p>
      <button
        className="sidebar__button sidebar__button-edit"
        onClick={openProfileEditModal}
      >
        Change profile data
      </button>
      <button
        className="sidebar__button sidebar__button-logout"
        onClick={openSignOutModal}
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;
