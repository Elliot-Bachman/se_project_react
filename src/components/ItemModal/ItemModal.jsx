import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        {/* Fixed image source */}
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
          {/* Add delete button */}
          <button
            type="button"
            className="modal__delete"
            onClick={() => {
              console.log("Deleting card:", card);
              handleDeleteClick(card);
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
