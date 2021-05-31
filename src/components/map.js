import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Alert } from "antd";

import "./map.css";
import ReactStreetview from "react-streetview";
import { useTranslation } from "react-i18next";
import { API_KEY } from "../utils/constants";
import AddRestaurantForm from "./add-restaurant-form";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places"];

function MapComponent({
  data,
  handleBounds,
  handleClick,
  displayAddRestaurantForm,
  handleInputChange,
  handleSubmit,
  newRestaurantLocation,
  handleMapRestaurantFormClose,
  setData,
  setGooglePlacesData,
  errors,
  buttonEnabled,
}) {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [map, setMap] = React.useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState("");

  const mapRef = React.useRef();
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const getLocation = () => {
    // https://stackoverflow.com/questions/57130901/getcurrentposition-in-js-does-not-work-on-ios
    // Set up getCurrentPosition options with a timeout
    const navigatorLocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Determine browser permissions status
    navigator.permissions.query({ name: "geolocation" }).then(
      (result) => {
        // result.state will be 'granted', 'denied', or 'error'
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = await position.coords.latitude;
              const lng = await position.coords.longitude;
              console.log("position", position);
              setStatus(null);
              setLocation({
                ...location,
                lat,
                lng,
              });
            },
            (error) => {
              // System/OS location services disabled */
              console.log("System/OS services disabled", navigator);
              noLocationFound();
            },
            navigatorLocationOptions
          );
        } else {
          // Browser location services disabled or error */
          console.log("Browser location services disabled", navigator);
          noLocationFound();
        }
      },
      (error) => {
        // Browser doesn't support querying for permissions */
        console.log("Browser permissions services unavailable", navigator);
        console.log("error", error);
        noLocationFound();
      }
    );
  };

  /* Handle no location found */
  const noLocationFound = () => {
    setStatus("NO_GEOLOCATION");
  };

  // Google Place Api with nearbySearch
  const fetchGooglePlaces = () => {
    try {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );
      const currentLocation = new window.google.maps.LatLng(
        location.lat,
        location.lng
      );
      const request = {
        location: currentLocation,
        radius: "20000", // unit is meters
        type: ["restaurant"],
        keyword: ["restaurant"],
      };
      const callback = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i += 1) {
            const place = results[i];
            const restaurantPlace = {
              id: place.id,
              restaurantName: place.name,
              address: place.vicinity,
              lat: place.geometry.location && place.geometry.location.lat(),
              long: place.geometry.location && place.geometry.location.lng(),
              ratings: [{ stars: place.rating }],
            };
            const placesData = data;
            placesData.push(restaurantPlace);

            setData(placesData);
            setGooglePlacesData(placesData);
          }
        }
      };
      service.nearbySearch(request, callback);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    fetchGooglePlaces();
  }, [location]);

  // https://codesandbox.io/s/react-google-maps-api-tl0sk
  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (status === "NO_GEOLOCATION") {
    return <Alert message={t("map.warning")} type="error" />;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location ? location : center}
      zoom={40}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onCenterChanged={() => handleBounds(map && map.getBounds())}
      onZoomChanged={() => handleBounds(map && map.getBounds())}
      onDblClick={(event) => handleClick(event)}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        position={location}
        label={{
          text: t("map.userLocationMarker.label"),
          color: "white",
          className: "labels",
        }}
      />
      {data.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={{
            lat: restaurant.lat,
            lng: restaurant.long,
          }}
          onLoad={(marker) => {
            const customIcon = (opts) =>
              Object.assign(
                {
                  path:
                    "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                  fillColor: "#34495e",
                  fillOpacity: 1,
                  strokeColor: "#000",
                  strokeWeight: 1,
                  scale: 1,
                },
                opts
              );

            marker.setIcon(
              customIcon({
                fillColor: "green",
                strokeColor: "white",
              })
            );
            return markerLoadHandler(marker, restaurant);
          }}
          onClick={(event) => markerClickHandler(event, restaurant)}
        />
      ))}

      {infoOpen && selectedPlace && (
        <InfoWindow
          anchor={markerMap[selectedPlace.id]}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div>
            <h3>{selectedPlace.restaurantName}</h3>
            <p>{selectedPlace.address}</p>
            <div
              style={{
                width: "800px",
                height: "450px",
                backgroundColor: "#eeeeee",
              }}
            >
              <ReactStreetview
                apiKey={API_KEY}
                streetViewPanoramaOptions={{
                  position: {
                    lat: selectedPlace.lat,
                    lng: selectedPlace.long,
                  },
                  pov: { heading: 100, pitch: 0 },
                  zoom: 1,
                }}
              />
            </div>
          </div>
        </InfoWindow>
      )}
      {displayAddRestaurantForm && newRestaurantLocation && (
        <InfoWindow
          position={newRestaurantLocation}
          onCloseClick={() => handleMapRestaurantFormClose()}
        >
          <AddRestaurantForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            showOnlyReviewSection={false}
            errors={errors}
            buttonEnabled={buttonEnabled}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <>loading</>
  );
}

export default React.memo(MapComponent);
