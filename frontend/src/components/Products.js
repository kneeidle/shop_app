import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import { connect } from 'react-redux'
import { Authorize } from '../actions/postActions'

function Products(props) {
  useEffect(() => {
    fetchItems();

    props.Authorize(JSON.parse(localStorage.getItem("Login")))
  }, []);


  const onLoadMore = () => {
    setVisible(Visible + 4);
  };

  const [items, setItems] = useState([]);
  const [Visible, setVisible] = useState(4);
  const [SearchValue, setSearchValue] = useState('');

  const fetchItems = async () => {
    const data = await axios.get('http://127.0.0.1:4000/product');
    console.log(data.data);
    setItems(data.data);
  };

  const sortedProducts = [...items];

  const onChangeSelect = (e) => {
    if (e.target.value === 'lowest') {
      sortedProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      setItems(sortedProducts);
    }

    if (e.target.value === 'highest') {
      sortedProducts.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
      setItems(sortedProducts);
    }
  };

  let filteredProducts = [];

  const updateSearch = (e) => {
    setSearchValue(e.target.value);
  };

  filteredProducts = items.filter((product) => product.title.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1);

  return (
    <div className="main__product" style={{ margin: '100px 0px 0px 0px', display: 'flex', flexDirection: 'column' }}>
      <div className="main__filters">

        <div className="filters">
          <div>
            Search:
          <input type="text" value={SearchValue} onChange={updateSearch} />
            <br></br><span>{filteredProducts.length} products found.</span>
          </div>
        </div>

        <div className="second__product">
          <h1>Products</h1>
        </div>

        <div className="price-filter">
          Filter by price:
          <select onChange={onChangeSelect}>
            <option value="">Select</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </select>
        </div>

      </div>



      <div className="products-main">

        {filteredProducts.slice(0, Visible).map((item) => (
          <div className="item">
            <Link to={`/products/${item._id}`}>
              <img className="" height="300px" width="300px" src={item.image} />
              <h1 key={item._id}>{item.title}</h1>
              <h2>Price: {item.price}$</h2>
            </Link>
          </div>
        ))}

        <br /><br />
        {Visible < items.length &&

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '30px 0px' }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>}
        <br /><br />
      </div>
    </div>

  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    Authorize: (auth) => { dispatch(Authorize(auth)); },
  }
}

export default connect(null, mapDispatchToProps)(Products);
