import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
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
          {console.log("Rendering Header")}
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          {console.log("Rendering Main")}
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          {console.log("Rendering Footer")}
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
          >
            <label className="modal__label">
              Name
              <input type="text" className="modal__input" placeholder="Name" />
            </label>

            <label className="modal__label">
              Image
              <input
                type="text"
                className="modal__input"
                placeholder="Image URL"
              />
            </label>

            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>

              <label className="modal__label modal__label_type_radio">
                <input
                  id="hot"
                  type="radio"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Hot</span>
              </label>

              <label className="modal__label modal__label_type_radio">
                <input
                  id="warm"
                  type="radio"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Warm</span>
              </label>

              <label className="modal__label modal__label_type_radio">
                <input
                  id="cold"
                  type="radio"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Cold</span>
              </label>
            </fieldset>
          </ModalWithForm>
        )}
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
