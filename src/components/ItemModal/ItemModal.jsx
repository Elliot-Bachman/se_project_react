import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  // Subscribe to the CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Add detailed debugging logs
  console.log("ItemModal - Selected card:", card);
  console.log("ItemModal - Current user:", currentUser);

  // Check if the current user owns the selected card
  const isOwn = card?.owner === currentUser?._id;
  console.log(
    "ItemModal - Is own card:",
    isOwn,
    "card owner:",
    card?.owner,
    "current user id:",
    currentUser?._id
  );

  // Conditional className for delete button
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card?.imageUrl || ""}
          alt={card?.name || "Card"}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__description">
            <h2 className="modal__caption">{card?.name || "No Name"}</h2>
            <p className="modal__weather">
              Weather: {card?.weather || "Unknown"}
            </p>
          </div>
          {isOwn && (
            <button
              type="button"
              className={itemDeleteButtonClassName}
              onClick={() => handleDeleteClick(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
