// src/MapComponent.tsx

import React, { FC, useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

// Define the type for your component props
interface MapProps {
  address: string;
}

const MapComponent: FC<MapProps> = ({ address }) => {
  // Replace YOUR_API_KEY with your actual Google Maps API key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
    // This library is needed for geocoding the address
    libraries: ["places"],
  });

  // Default coordinates to prevent errors while geocoding
  const [coords, setCoords] = React.useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  React.useEffect(() => {
    if (isLoaded) {
      // Create a geocoder instance
      const geocoder = new google.maps.Geocoder();
      // Geocode the address to get its latitude and longitude
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          setCoords({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    }
  }, [isLoaded, address]);

  // Use useMemo to prevent the map options from being recreated on every render
  const mapOptions = useMemo(() => ({
    zoom: 15,
    center: coords,
  }), [coords]);

  // Use useMemo to prevent the container style from being recreated on every render
  const containerStyle = useMemo(() => ({
    width: '100%',
    height: '400px',
  }), []);

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
    >
      {/* Conditionally render the Marker only if the coordinates are valid */}
      {coords.lat !== 0 && coords.lng !== 0 && (
        <MarkerF
          position={coords}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;