import React, { useState, useEffect } from 'react';
import './UploadProductPage.css';
import axios from 'axios';

function UploadProductPage() {

  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [baseImage, setBaseImage] = useState(null);
  const [baseImage1, setBaseImage1] = useState([]);

  useEffect(() => {
    if(baseImage != null && baseImage1.length < 3){
    setBaseImage1([...baseImage1, baseImage])
    console.log(baseImage1)
    }
  }, [baseImage]);


  const onTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      image: baseImage,
      title: TitleValue,
      desc: DescriptionValue,
      price: PriceValue,
    };
    console.log(product);
    axios.post('http://localhost:4000/product/upload', product)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setBaseImage(base64)
  }

  const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = (() => {
        resolve(fileReader.result)
      })

      fileReader.onerror = ((error) => {
        reject(error);
      })
    })
  }

  return (
    <div className="form1" style={{ maxWidth: '700px', margin: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', whiteSpace: 'nowrap' }}>
        <h2>Upload New Hamburger</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div>

          <input type="file" onChange={(e) => {
            uploadImage(e);
          }} />
        <div className="image-container">
          {baseImage1.map((item)=>(
          <img src={item} height="200px" />
          ))}
        </div>
        </div>

        <div className="input-classic">
          <label>Title</label>
          <input
            type="text"
            id="title"
            onChange={(e) => { onTitleChange(e); }}
            value={TitleValue}
          />
        </div>
        <div>
          <label>Descripton</label>
          <textarea rows="5"
            onChange={(e) => { onDescriptionChange(e); }}
            value={DescriptionValue}
          />
        </div>

        <div className="input-number">
          <label>Price</label>
          <input
            onChange={(e) => { onPriceChange(e); }}
            value={PriceValue}
            type="number"
          />
        </div>

        <div>
          <button>Submit</button>
        </div>

      </form>

    </div>
  );
}

export default UploadProductPage;
