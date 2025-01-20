import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup } from "../../utils/auth.js";

const RegisterModal = ({ closeActiveModal, onRegister, activeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(""); // Optional field for user avatar

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, avatar, email, password })
      .then((data) => {
        console.log("User successfully registered:", data);
        closeActiveModal(); // Close the modal upon success
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert(error); // Display error to the user
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={activeModal === "register"}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Your name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL (optional)
        <input
          type="text"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
