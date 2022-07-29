import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './pages/product/list.product';
import SvgImages from './pages/image/svg.image';
// import ExportToPDF from './pages/pdf/ExportToPDF';
import routes from './routes/routes';
import ListSetting from './pages/setting/list.setting'

export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={routes.setting.main} component={ListSetting} />
            <Route exact path={routes.image.svg} component={SvgImages} />
            <Route path={routes.product} component={ProductList} />
            {/* <Route path={routes.pdf} component={ExportToPDF} /> */}
          </Switch>
        </BrowserRouter>
    </div>
  );
}
