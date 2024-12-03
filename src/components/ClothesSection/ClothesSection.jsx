import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard"; // Import the missing ItemCard component

function ClothesSection({ handleAddClick, clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item, index) => (
          <ItemCard
            key={index} // Use index as a fallback key (unique keys are better)
            item={item}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
