import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBench, selectBenchById } from './benchesSlice';
import { selectAllReviews } from '../reviews/reviewsSlice';
import BenchesMap from './BenchesMap';
import ReviewIndex from '../reviews/ReviewIndex';
import ReviewForm from '../reviews/ReviewForm';

const BenchShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bench = useSelector((state) => selectBenchById(state, id));
  const reviews = useSelector(selectAllReviews);

  useEffect(() => {
    dispatch(fetchBench(id));
  }, [id]);

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
        <p>Number of seats: {bench.seats}</p>
        <ReviewIndex reviews={reviews} />
        <ReviewForm />
      </div>
    </div>
  ) : null;
};

export default BenchShow;
