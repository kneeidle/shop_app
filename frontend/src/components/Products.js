import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css'

function Products() {

  useEffect(() => {
    fetchItems();
  }, []);

  const onLoadMore = () => {

    setVisible(Visible + 4);

  }

  const [items, setItems] = useState([]);
  const [Visible, setVisible] = useState(4);
  const [SearchValue, setSearchValue] = useState("");
  const [FilterItems, setFilterItems] = useState([]);


  const fetchItems = async () => {
    const data = await axios.get(`http://127.0.0.1:4000/product`);
    console.log(data.data);
    setItems(data.data);
  };

  let sortedProducts = [...items];

  const onChangeSelect = (e) => {

    if (e.target.value === "lowest") {

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

    if (e.target.value === "highest") {

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

  }

  let filteredProducts = [];


  const updateSearch = (e) => {

    setSearchValue(e.target.value)

  }

     
  filteredProducts = items.filter((product) => {

    return product.title.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1;
  })


  return (
    <div className="main__product" style={{ margin: '100px 0px 0px 0px', display: 'flex', flexDirection: 'column' }}>
      <div className="second__product">
      <h1>Products</h1>
      </div> 


      <div className="filters" >

        <div>
          {filteredProducts.length} products found.
      </div>
        <div>
          Filter by price:
          <select onChange={onChangeSelect}>
            <option value="">Select</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </select>
        </div>
        <div>
          Search:
          <input type="text" value={SearchValue} onChange={updateSearch} />
        </div>
      </div>



      <div className='products-main'>

        {filteredProducts.slice(0, Visible).map(item => (
          <Link to={`/products/${item._id}`}>
            <img className="corners" height='300px' width='300px' src="https://assets.myfoodandfamily.com/adaptivemedia/rendition/195370-3000x2000.jpg?id=093000b4880e99e6cd87fa511235a789145c5a0a&ht=650&wd=1004&version=1&clid=pim" />
            <h1 key={item._id}>{item.title}</h1>
            <h2>Price: {item.price}$</h2>
          </Link>
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

export default Products;
