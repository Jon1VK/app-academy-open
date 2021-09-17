import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const ItemLink = ({ item }) => {
  const { url } = useRouteMatch();

  return (
    <li>
      <Link to={`${url}/items/${item.id}`}>
        <img src={item.imageUrl} alt="" />
      </Link>
    </li>
  );
};

export default ItemLink;
