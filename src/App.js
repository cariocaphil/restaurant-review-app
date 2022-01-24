import React, { useEffect, useState } from "react";
import RestaurantList from "./components/restaurant-list";
import Map from "./components/map";
import initialData from "./data/restaurants";
import { getAverageRating } from "./utils/helper-functions";
import "./App.css";
import { initialState } from "./utils/constants";
import { validate } from "./validate";
import { useData } from "./contexts/DataContext";

function App() {
  const [currentBounds, setCurrentBounds] = useState(null); // map bounds state
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [googlePlacesData, setGooglePlacesData] = useState([]);
  const [showGooglePlaces, setShowGooglePlaces] = useState(true);
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    stars: "",
    comment: "",
  });
  const [displayAddRestaurantForm, setDisplayAddRestaurantForm] = useState(
    null
  );
  const [newRestaurantLocation, setNewRestaurantLocation] = useState(null);

  const { data, setData } = useData();

  // handlers for rating form filter
  const handleMinRating = (value) => {
    setMinRating(value);
  };

  const handleMaxRating = (value) => {
    setMaxRating(value);
  };

  // handlers for review addition in list
  const addReview = (id) => {
    const reviewObject = {
      // restaurant id is different from rating id
      restaurantId: id,
      stars: parseInt(inputs.stars, 10),
      comment: inputs.comment,
    };

    const indexRestaurant = data.findIndex(
      (item) => item.id === reviewObject.restaurantId
    );
    const currentData = data;
    currentData[indexRestaurant].ratings.push({
      // rating id
      id: currentData[indexRestaurant].ratings.length + 1,
      stars: reviewObject.stars,
      comment: reviewObject.comment,
    });
    setData(currentData);
  };

  const handleSubmit = (event, id) => {
    event.preventDefault();
    event.target.reset();
    addReview(id);
    setInputs({
      name: "",
      address: "",
      stars: "",
      comment: "",
    });
  };

  const noErrors = Object.values(errors).every((e) => e === "");
  const noEmptyInputs = displayAddRestaurantForm
    ? Object.values(inputs).every((e) => e !== "")
    : inputs.stars !== "" && inputs.comment !== "";
  const buttonEnabled = noErrors && noEmptyInputs;

  const handleInputChange = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    setErrors(validate(inputs));
  };

  // handlers for restaurant addition in map
  const addRestaurant = (inputs, id) => {
    const restaurantObject = {
      id,
      restaurantName: inputs.name,
      address: inputs.address,
      lat: newRestaurantLocation.lat,
      long: newRestaurantLocation.lng,
      ratings: [
        { id: 1, stars: parseInt(inputs.stars, 10), comment: inputs.comment },
      ],
    };
    const currentData = data;

    currentData.push(restaurantObject);
    setData(currentData);
    setInputs({
      name: "",
      address: "",
      stars: "",
      comment: "",
    });
  };

  // submission via form in map
  const handleClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const restaurantPositionObject = {
      lat,
      lng,
    };
    setDisplayAddRestaurantForm(true);
    setNewRestaurantLocation(restaurantPositionObject);
  };
  const handleMapSubmit = (event) => {
    event.preventDefault();
    const newRestaurantId = new Date().getTime();
    addRestaurant(inputs, newRestaurantId);
    setDisplayAddRestaurantForm(false);
  };

  const handleMapRestaurantFormClose = () => {
    setDisplayAddRestaurantForm(false);
    setInputs({
      name: "",
      address: "",
      stars: "",
      comment: "",
    });
  };

  const handleBounds = (bounds) => {
    setCurrentBounds(bounds);
  };

  const toggleData = () => {
    setShowGooglePlaces((prevState) => !prevState);
  };

  useEffect(() => {
    showGooglePlaces ? setData(googlePlacesData) : setData(initialData);
  }, [showGooglePlaces, googlePlacesData]);

  const filteredData =
    data &&
    data.filter((restaurant) => {
      const averageRating = getAverageRating(restaurant.ratings);
      return averageRating >= minRating && averageRating <= maxRating;
    });

  return (
    <>
      <div className="flex-container">
        <div className="restaurant-section">
          <RestaurantList
            data={filteredData}
            minRating={minRating}
            maxRating={maxRating}
            handleMaxRating={handleMaxRating}
            handleMinRating={handleMinRating}
            currentBounds={currentBounds}
            handleBounds={handleBounds}
            handleInputChange={handleInputChange}
            inputs={inputs}
            handleSubmit={handleSubmit}
            newRestaurantLocation={newRestaurantLocation}
            toggleData={toggleData}
            errors={errors}
            buttonEnabled={buttonEnabled}
          />
        </div>
        <div className="map-section">
          <Map
            data={filteredData}
            handleBounds={handleBounds}
            handleClick={handleClick}
            handleInputChange={handleInputChange}
            displayAddRestaurantForm={displayAddRestaurantForm}
            handleMapRestaurantFormClose={handleMapRestaurantFormClose}
            newRestaurantLocation={newRestaurantLocation}
            inputs={inputs}
            handleSubmit={handleMapSubmit}
            currentBounds={currentBounds}
            showGooglePlaces={showGooglePlaces}
            googlePlacesData={googlePlacesData}
            setGooglePlacesData={setGooglePlacesData}
            errors={errors}
            buttonEnabled={buttonEnabled}
          />
        </div>
      </div>
    </>
  );
}

export default App;
