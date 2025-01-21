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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, postItem } from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { signin, signup, checkToken } from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  // State for user authentication and data
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // State for temperature unit toggle
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Handlers for modals and cards
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const closeActiveModal = () => setActiveModal("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  // Add new item
  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    const newItem = {
      name: item.name,
      imageUrl: item.link,
      weather: item.weather.toLowerCase(),
    };

    postItem(newItem, token)
      .then((savedItem) => {
        setClothingItems([savedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // Delete item
  const handleDeleteItem = (itemToDelete) => {
    const token = localStorage.getItem("jwt");

    deleteItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  // User registration
  const handleUserRegister = (userData) => {
    signup(userData)
      .then(() =>
        signin({ email: userData.email, password: userData.password })
      )
      .then((loginRes) => {
        localStorage.setItem("jwt", loginRes.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => alert("Registration or login failed. Please try again."));
  };

  // User login
  const handleUserLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(() => alert("Login failed. Please check your credentials."));
  };

  // Function to handle liking/disliking an item
  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("You must be logged in to like items.");
      return;
    }

    const isLiked = item.likes.includes(currentUser?._id); // Determine if item is already liked
    const likeRequest = !isLiked
      ? addCardLike(item._id, token)
      : removeCardLike(item._id, token);

    likeRequest
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((prevItem) =>
            prevItem._id === item._id ? updatedCard : prevItem
          )
        );
      })
      .catch((err) => console.error("Error updating likes:", err));
  };

  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("jwt");

    // Update the state
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear current user data

    // Optionally redirect the user
    window.location.href = "/";
  };

  // Load weather data on mount
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Raw weather data from API:", data); // Log raw API response
        const filteredData = filterWeatherData(data);
        console.log("Filtered weather data:", filteredData); // Log processed weather data
        setWeatherData(filteredData); // Update state
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err); // Log errors
      });
  }, []);

  // Load clothing items on mount
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched items from API:", data); // Log the raw API response
        setClothingItems(data.data); // Update state
        console.log("Clothing items state after update:", data.data); // Log updated state
      })
      .catch((err) => {
        console.error("Error fetching items:", err); // Log errors
      });
  }, []);

  // Validate token and fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleSignOut={handleSignOut} // Pass the sign-out handler
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              onAddItem={handleAddItemSubmit}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteClick={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
