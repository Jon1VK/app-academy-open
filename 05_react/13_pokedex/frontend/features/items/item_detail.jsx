import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectItemById } from './items_slice';

const ItemDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => selectItemById(state, id));

  if (!item) {
    return null;
  }

  return (
    <div>
      <ul>
        <li>
          <h3>{item.name}</h3>
        </li>
        <li>Happiness: {item.happiness}</li>
        <li>Price: ${item.price}</li>
      </ul>
    </div>
  );
};

export default ItemDetail;
