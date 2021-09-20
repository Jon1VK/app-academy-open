import React, { useEffect, useRef } from 'react';
import MarkerManager from '../../util/marker_manager';

const BenchesMap = ({ benches }) => {
  const mapRef = useRef();
  const MarkerManagerRef = useRef();

  useEffect(() => {
    const googleMap = new google.maps.Map(mapRef.current, {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13,
    });
    MarkerManagerRef.current = new MarkerManager(googleMap);
  }, []);

  useEffect(() => {
    MarkerManagerRef.current.updateMarkers(benches);
  }, [benches]);

  return (
    <div id="map-container" ref={mapRef}>
      Map!
    </div>
  );
};

export default BenchesMap;
