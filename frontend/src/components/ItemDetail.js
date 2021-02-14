import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemDetail.css';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import { productCounter } from '../actions/postActions';

function ItemDetail(props) {

  const [item, setItem] = useState([]);
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);


  useEffect(() => {
    fetchItem();
    console.log(props.match);
    console.log(props);
    props.productCounter(parseInt(localStorage.getItem('cartNumbers')) ? parseInt(localStorage.getItem('cartNumbers')) : 0);
  }, []);

  let images = [];

  useEffect(() => {
    if (item1.length != 0) {

      images = JSON.parse(item1).map((item) => {
        return {
          original: `${item}`,
          thumbnail: `${item}`,
        }
      })
      setItem2(images)
      console.log(images)
    }
  }, [item1]);

  const fetchItem = async () => {
    const data = await axios.get(`http://127.0.0.1:4000/product/${props.match.params.id}`);
    console.log(data.data);
    setItem(data.data);
    setItem1(data.data.image);
  };

  const cartNumbers = (e) => {
    e.preventDefault();
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      props.productCounter(productNumbers + 1);
    } else {
      localStorage.setItem('cartNumbers', 1);
      props.productCounter(1);
    }
    //----------------------------------------------------------
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    item.inCart = 0;
    if (cartItems != null) {
      if (cartItems[item.title] == undefined) {
        item.inCart = 1;
        cartItems = {
          ...cartItems,
          [item.title]: item,
        };
      } else {
        cartItems[item.title].inCart += 1;
      }
    } else {
      item.inCart = 1;
      cartItems = {
        [item.title]: item,
      };
      console.log(cartItems);
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    //--------------------------------------------------------------

    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
      cartCost = parseFloat(cartCost);
      localStorage.setItem('totalCost', cartCost + item.price);
    } else {
      localStorage.setItem('totalCost', item.price);
    }
  };

  return (

    <>

      <div className="main">
        <div className="img">
          <ImageGallery showPlayButton={false} items={item2} />
        </div>
        <div className="details">
          <div>
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star" />
            <span className="fa fa-star" />
          </div>
          <div><h1>{item.title}</h1></div>
          <div><h2>{item.desc}</h2></div>
          <div className="spacer"></div>
          <div className="h3-details">
          <h3>Price: <span className="price-item">${item.price}</span></h3>
          <div className="h3-details-item"><h3>Hamurger size: <span className="size-item">S</span><span className="size-item">M</span><span className="size-item">L</span></h3></div>
          </div>
          <button type="submit" onClick={cartNumbers} >Add to cart</button>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  productCounter: (id) => { dispatch(productCounter(id)); },
});

export default connect(null, mapDispatchToProps)(ItemDetail);
