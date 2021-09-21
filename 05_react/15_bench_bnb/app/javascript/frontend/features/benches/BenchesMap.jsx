import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import MarkerManager from '../../util/marker_manager';
import { updateFilter } from '../filters/filtersSlice';
import { fetchBenches } from './benchesSlice';

const BenchesMap = ({
  benches,
  options = { center: { lat: 37.7758, lng: -122.435 }, zoom: 13 },
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const mapRef = useRef();
  const MarkerManagerRef = useRef();

  useEffect(() => {
    const googleMap = new google.maps.Map(mapRef.current, {
      ...options,
    });

    MarkerManagerRef.current = new MarkerManager(googleMap, history);

    if (!disabled) {
      googleMap.addListener('idle', () => {
        dispatch(updateFilter('bounds', googleMap.getBounds().toJSON()));
        dispatch(fetchBenches());
      });

      googleMap.addListener('click', (e) => {
        const { lat, lng } = e.latLng.toJSON();
        MarkerManagerRef.current.addNewBenchMarker({ lat, lng });
        history.push(`/new?lat=${lat}&lon=${lng}`);
      });
    }
  }, []);

  useEffect(() => {
    MarkerManagerRef.current.updateMarkers(benches, disabled);
  }, [benches, disabled]);

  return (
    <div id="map-container" ref={mapRef}>
      Map!
    </div>
  );
};

export default BenchesMap;
