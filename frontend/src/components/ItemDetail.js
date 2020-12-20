import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemDetail.css'
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux'
import { deletePost } from '../actions/postActions'



function ItemDetail(props) {

  useEffect(() => {
    fetchItem();
    console.log(props.match);
    console.log(props)
    props.deletePost(parseInt(localStorage.getItem('cartNumbers')) ? parseInt(localStorage.getItem('cartNumbers')) : 0)
  }, []);


  const [item, setItem] = useState({ title: "title" });

  const fetchItem = async () => {
    const data = await axios.get(`http://127.0.0.1:4000/product/${props.match.params.id}`);
    console.log(data.data);
    setItem(data.data);
  };

  const images = [
    {
      original: 'https://embed.widencdn.net/img/beef/1akcqwmdqs/exact/classic-beef-cheeseburgers-horizontal.tif?keep=c&u=7fueml',
      thumbnail: 'https://embed.widencdn.net/img/beef/1akcqwmdqs/exact/classic-beef-cheeseburgers-horizontal.tif?keep=c&u=7fueml',
    },
    {
      original: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/195370-3000x2000.jpg?id=093000b4880e99e6cd87fa511235a789145c5a0a&ht=650&wd=1004&version=1&clid=pim',
      thumbnail: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/195370-3000x2000.jpg?id=093000b4880e99e6cd87fa511235a789145c5a0a&ht=650&wd=1004&version=1&clid=pim',
    },
    {
      original: 'https://embed.widencdn.net/img/beef/1akcqwmdqs/exact/classic-beef-cheeseburgers-horizontal.tif?keep=c&u=7fueml',
      thumbnail: 'https://embed.widencdn.net/img/beef/1akcqwmdqs/exact/classic-beef-cheeseburgers-horizontal.tif?keep=c&u=7fueml',
    },
  ];

  const cartNumbers = (e) => {
    e.preventDefault()
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      props.deletePost(productNumbers + 1)

    } else {
      localStorage.setItem('cartNumbers', 1);
      props.deletePost(1)
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
          [item.title]: item
        }
      }else{

        cartItems[item.title].inCart += 1;
      }
    } else {
      item.inCart = 1;
      cartItems = {
        [item.title]: item
      }
      console.log(cartItems)
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    //--------------------------------------------------------------

    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
      cartCost = parseFloat(cartCost);
      localStorage.setItem("totalCost", cartCost + item.price);
    } else {
      localStorage.setItem("totalCost", item.price);
    }




  }






  return (


    <>


      <div className="main">
        <div className="img">
          <ImageGallery items={images} />
        </div>
        <div className="details">
          <div>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <h1>{item.title}</h1>
          <h2>{item.desc}</h2>
          <h3>Hamurger size: S M L</h3>
          <h3>Price: ${item.price}</h3>
          <input type="submit" onClick={cartNumbers} value="Add to cart" />
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => { dispatch(deletePost(id)) }
  }

}

export default connect(null, mapDispatchToProps)(ItemDetail)