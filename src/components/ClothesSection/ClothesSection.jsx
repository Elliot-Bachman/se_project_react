import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header-button">
        <p className="clothes-section__header">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
