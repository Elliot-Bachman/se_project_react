import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Filter items based on weather type
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit}. You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item, index) => (
            <ItemCard key={index} item={item} onCardClick={handleCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
