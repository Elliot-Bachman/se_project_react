import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItemSubmit = (item) => {
    console.log("Adding item:", item); // Debugging log
    setClothingItems([item, ...clothingItems]); // Add the new item to the array
    closeActiveModal(); // Close the modal after submission
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
  }, []); // Dependency array is left empty to avoid unnecessary reruns

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
            <Route path="/profile" element={<p>PROFILE</p>} />
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
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
