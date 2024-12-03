import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  handleCardClick,
  clothingItems,
  handleDeleteItem,
  handleAddClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleDeleteItem={handleDeleteItem}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
