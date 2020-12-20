import React, { useState } from 'react'
import './UploadProductPage.css'
import axios from 'axios';


function UploadProductPage() {


    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)


    const onTitleChange = (event) => {
        setTitleValue(event.target.value)
        
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.target.value)
        
    }

    const onPriceChange = (event) => {
        setPriceValue(event.target.value)
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let product = {
            title: TitleValue,
            desc: DescriptionValue,
            price: PriceValue,
        }
            console.log(product);
            axios.post('http://localhost:4000/product/upload', product)
            .then(response => console.log(response.data))
            .catch(err => console.log(err));

    }

    return (
        <div className="form1" style={{ maxWidth: '700px', margin: '100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', whiteSpace: "nowrap" }}>
                <h2>Upload New Hamburger</h2>
            </div>


            <form onSubmit={handleSubmit}>
                <div>
                #FileUpload soon
                </div>

                <div className="input-classic">
                    <label>Title</label>
                    <input
                         type="text"
                         id="title"
                        onChange={(e) => {onTitleChange(e)}}
                        value={TitleValue}
                    />
                </div>
                <div>
                    <label>Descripton</label>
                    <textarea rows="5"
                        onChange={(e) => {onDescriptionChange(e)}}
                        value={DescriptionValue}
                    />
                </div>

                <div className="input-number">
                    <label>Price</label>
                    <input
                        onChange={(e) => {onPriceChange(e)}}
                        value={PriceValue}
                        type="number"
                    />
                </div>

                <div>
                    <button>Submit</button>
                </div>

            </form>




        </div>
    )
}

export default UploadProductPage;
