import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { API_KEY } from "../utils/constants";
import "./map.css";
import ReactStreetview from "react-streetview";
import { useTranslation } from "react-i18next";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapComponent({ data, handleBounds }) {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = await position.coords.latitude;
      let lng = await position.coords.longitude;
      setLocation({
        ...location,
        lat,
        lng,
      });
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [location, setLocation] = useState(null);

  // https://codesandbox.io/s/react-google-maps-api-tl0sk
  const markerClickHandler = (event, place) => {
    console.log(event);
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location ? location : center}
      zoom={40}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onCenterChanged={() => handleBounds(map && map.getBounds())}
      onZoomChanged={() => handleBounds(map && map.getBounds())}
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
      {data.map((restaurant, index) => (
        <Marker
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
    </GoogleMap>
  ) : (
    <>loading</>
  );
}

export default React.memo(MapComponent);
