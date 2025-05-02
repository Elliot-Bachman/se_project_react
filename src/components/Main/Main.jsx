import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Add detailed debugging logs
  console.log("Main component - All clothing items:", clothingItems);
  console.log("Main component - Weather data:", weatherData);

  // Filter items based on weather type
  const filteredItems = clothingItems.filter((item) => {
    console.log(
      `Filtering item: name=${item.name}, id=${item._id}, owner=${item.owner}, weather=${item.weather}, weatherType=${weatherData.type}`
    );
    return (
      item.weather &&
      item.weather.toLowerCase() === weatherData.type.toLowerCase()
    );
  });

  console.log("Main component - Filtered items:", filteredItems);

  return (
    <main>
      <div className="main__container">
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
            {currentTemperatureUnit}. You may want to wear:
          </p>
          <ul className="cards__list">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;
