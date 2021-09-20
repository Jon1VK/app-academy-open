import React, { useEffect, useRef } from 'react';

const BenchesMap = () => {
  const map = useRef(null);

  useEffect(() => {
    new google.maps.Map(map.current, {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13,
    });
  }, []);

  return (
    <div id="map-container" ref={map}>
      Map!
    </div>
  );
};

export default BenchesMap;
