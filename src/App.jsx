import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductList from './pages/product/list.product';
import routes from './routes/routes';

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path={routes.product} component={ProductList}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
