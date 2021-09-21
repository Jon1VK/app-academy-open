import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBenchById } from './benchesSlice';
import BenchesMap from './BenchesMap';

const BenchShow = () => {
  const { id } = useParams();
  const bench = useSelector((state) => selectBenchById(state, id));

  const options = {
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    center: { lat: bench?.lat, lng: bench?.lon },
    zoom: 14,
  };

  return bench ? (
    <div className="row">
      <div className="col-6">
        <BenchesMap benches={[bench]} options={options} disabled={true} />
      </div>
      <div className="col-6">
        <h2>{bench.description}</h2>
        <span>Number of seats: {bench.seats}</span>
      </div>
    </div>
  ) : null;
};

export default BenchShow;
