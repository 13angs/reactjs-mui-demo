import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import routes from '../../routes/routes';

export default function ProductList() {
  const history = useHistory();

  const goToDetail = (item) => {

    // need to pass the parent route
    history.push(`${routes.product}/${item}`);

    // can't go back to the previous page
    // history.replace(`products/${item}`);
  };
  return (
    <div>
      {[0, 1, 2, 3].map((item) => (
        <button key={item} onClick={() => goToDetail(item)}>
          Product {item}{' '}
        </button>
      ))}
    </div>
  );
}
