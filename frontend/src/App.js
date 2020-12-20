import React, {useEffect} from 'react';
import Nav from './components/Nav'
import Contact from './components/Contact'
import Products from './components/Products'
import Home from './components/Home'
import ItemDetail from './components/ItemDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import UploadProductPage from './components/UploadProductPage/UploadProductPage';
import Cart from './components/Cart';
import Login from './components/Login';
import BottomMenu from './components/BottomMenu'

function App() {

 const getData = (val) => {
    // do not forget to bind getData in constructor
    console.log(val);
}

useEffect(() => {

  localStorage.setItem("totalCost", 0);

}, []);
 
  return (
    <Router>
      <div className="App">
        <Nav />
        <BottomMenu/>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/contact" component={Contact} />
          <Route path="/products/:id" component={ItemDetail} />
          <Route path="/product/upload" component={UploadProductPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}//test

export default App;
