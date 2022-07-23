import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './pages/product/list.product';
import SvgImages from './pages/image/svg.image';
import routes from './routes/routes';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.image.svg} component={SvgImages} />
          <Route path={routes.product} component={ProductList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
