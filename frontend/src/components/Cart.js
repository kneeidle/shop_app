import React, { useEffect, useState } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { productCounter } from '../actions/postActions';

function Cart(props) {
  const [cartItem, setcartItem] = useState({});

  useEffect(() => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    setcartItem(cartItems);
  }, []);

  const deleteProduct = (item1) => {
    cartItems = {
      ...cartItems,
      [item1.title]: undefined,
    };
    setcartItem(cartItems);
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    localStorage.setItem('cartNumbers', productNumbers - item1.inCart);
    props.productCounter(productNumbers - item1.inCart);

    let cartCost = localStorage.getItem('totalCost');

    cartCost = parseFloat(cartCost);
    localStorage.setItem('totalCost', cartCost - (item1.inCart * item1.price));
  };

  const itemValueChangeDown = (item1) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems[item1] !== undefined) {
      if (cartItems[item1].inCart > 0) {
        cartItems[item1].inCart -= 1;
        //-------------------------------------------------------
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);

        localStorage.setItem('cartNumbers', productNumbers - 1);
        props.productCounter(productNumbers - 1);
      }
      setcartItem(cartItems);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }
  };

  const itemValueChangeUp = (item1) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems[item1] !== undefined) {
      cartItems[item1].inCart += 1;


      setcartItem(cartItems);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }
    //---------------------------------------------------------
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    localStorage.setItem('cartNumbers', productNumbers + 1);
    props.productCounter(productNumbers + 1);
  };

  const cartCost = localStorage.getItem('totalCost');
  let cartItems = localStorage.getItem('productsInCart');

  cartItems = JSON.parse(cartItems);
  const Items = cartItems ? (Object.values(cartItem).map((item) => ( item != undefined ?(
    <div className="containerBasket">
      <div className="product-icon">
        <ion-icon onClick={() => { deleteProduct(item); }} name="close-circle" />
      </div>
      <div className="product-title">
        <img className="product-img" src={ JSON.parse(item.image)[0] } />
        <span>{ item.title }</span>
      </div>
      <div className="price">${ item.price }</div>
      <div className="quantity">
        <ion-icon onClick={() => { itemValueChangeDown(item.title); }} name="arrow-back-circle-outline" />
        <span>{ item.inCart }</span>
        <ion-icon onClick={() => { itemValueChangeUp(item.title); }} name="arrow-forward-circle-outline" />
      </div>
      <div className="total">
        { parseFloat(item.inCart * item.price).toFixed(2) }
      </div>

    </div>) : ("")
  ))) : ("");


  let sum = 0;

  const Items1 = cartItem ? (Object.values(cartItem).map((item) => (
    sum += ( item != undefined ?( item.inCart * item.price) :('') )
  ))) : (null);
  

  let a = Object.values(cartItem).filter((item)=>{ return item != undefined})

  return (
    <>
      <div className="cart__main">
        <h1>Cart</h1>
      </div>
      <div className="products-container">
        <div className="product-header">
          <h5 className="product-title">PRODUCT</h5>
          <h5 className="price">PRICE</h5>
          <h5 className="quantity">QUANTITY</h5>
          <h5 className="total">TOTAL</h5>
        </div>
        <div className="products">
          {Items}
          { a.length ? (<div className="basketTotalContainer">
            <h4 className="basketTotalTitle">
              Basket Total
            </h4>
            <h4 className="basketTotal">
              ${parseFloat(sum).toFixed(2)}
            </h4>
          </div>) : (<h4>CART IS EMPTY</h4>)}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  productCounter: (id) => { dispatch(productCounter(id)); },
});

export default connect(null, mapDispatchToProps)(Cart);
