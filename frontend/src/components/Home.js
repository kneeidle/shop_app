import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {

  const [Products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/product`)
      .then(response => {

        setProducts(response.data)

      })
  }, [])

  const renderCards = Products.map((product, index) => {

    
  })


  return (
    <div className="home-main">
      <div style={{ width: '75%', margin: '100px auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h2> Let's Eat Something</h2>
        </div>


        {Products.length === 0 ?
          <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>No post yet...</h2>
          </div> :
          <div>

            {renderCards}

          </div>

        }
        <br /><br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;