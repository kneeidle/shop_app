import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Contact from './components/Contact';
import Products from './components/Products';
import ItemDetail from './components/ItemDetail';
import './App.css';
import UploadProductPage from './components/UploadProductPage/UploadProductPage';
import Cart from './components/Cart';
import Login from './components/Login';
import BottomMenu from './components/BottomMenu';
import Logout from './components/Logout';
import PrivateRoute from "./routers/PrivateRoute"
import PublicRoute from "./routers/PublicRoute"

function App() {
  useEffect(() => {
    localStorage.setItem('totalCost', 0);
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <BottomMenu />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/contact" component={Contact} />
          <PrivateRoute path="/products/:id" component={ItemDetail} />
          <PrivateRoute path="/product/upload" component={UploadProductPage} />
          <PrivateRoute path="/cart" component={Cart} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
