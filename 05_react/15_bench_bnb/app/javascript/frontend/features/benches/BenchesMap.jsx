import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import MarkerManager from '../../util/marker_manager';
import { updateBounds } from '../filters/filtersSlice';
import { fetchBenches } from './benchesSlice';

const BenchesMap = ({ benches }) => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const MarkerManagerRef = useRef();

  useEffect(() => {
    const googleMap = new google.maps.Map(mapRef.current, {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13,
    });

    googleMap.addListener('idle', () => {
      dispatch(updateBounds(googleMap.getBounds().toJSON()));
      dispatch(fetchBenches());
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
