import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, postItem } from "../../utils/api";

function App() {
  // State for weather data
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  // State for modals
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // State for clothing items
  const [clothingItems, setClothingItems] = useState([]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // Stop the effect if there is no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal(); // Use the existing function to close the modal
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // Dependency on activeModal

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItemSubmit = (item) => {
    const newItem = {
      name: item.name,
      imageUrl: item.link, // Use `imageUrl` as per db.json
      weather: item.weather.toLowerCase(), // Add logic for selecting weather dynamically if required
    };

    postItem(newItem)
      .then((savedItem) => {
        setClothingItems([savedItem, ...clothingItems]); // Add the saved item
        console.log("Item successfully added:", savedItem); // Debugging log
        closeActiveModal(); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding item:", error); // Log errors
      });
  };

  const handleDeleteItem = (itemToDelete) => {
    deleteItem(itemToDelete._id) // Call the API to delete the item
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal(); // Close the modal
      })
      .catch(console.error); // Handle errors
  };

  useEffect(() => {
    console.log("App Component Rendered");
    console.log("Weather Data:", weatherData);
    console.log("Current Temperature Unit:", currentTemperatureUnit);

    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log("Filtered Weather Data:", filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // Leave this empty to avoid unnecessary reruns

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched items from server:", data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems} // Pass items to Main
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        {/* AddItemModal */}
        {activeModal === "add-garment" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onAddItem={handleAddItemSubmit} // Use the new submit handler
          />
        )}

        {/* ItemModal */}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
