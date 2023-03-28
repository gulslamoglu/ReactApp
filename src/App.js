import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {


    const [numInputs, setNumInputs] = useState(1);
    const [inputValues, setInputValues] = useState([]);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    const handleInputChange = (event, index) => {
      const values = [...inputValues];
      values[index] = event.target.value;
      setInputValues(values);
    };


    const handleSubmit = (event) => {
      event.preventDefault();

      // giris verilerini bir nesne olarak hazırladım
     /* const data = {};
      for (let i = 0; i < numInputs; i++) {
        data[`input${i}`] = inputValues[i];
      }*/


      const data1= {sentences:inputValues}

      // API aracılığıyla verileri sunucuya gönderme
      const data2 = axios.post('http://localhost:8080/sentences', data1)
        .then(response => {
          console.log(response);
          //setResponse(data2.response);
          const { data } = data2;
          setData1(response.data.response);
          setData2(response.data.time);
        })
        .catch(error => {
          console.error(error);
        })
     };

      const handleNumInputsChange = (event) => {
      setNumInputs(parseInt(event.target.value));
      setInputValues(Array(parseInt(event.target.value)).fill(''));
    };

    // Kullanıcının sayıda giriş alanı belirlediği alan
    const numInputsField = (
      <div>
        <label htmlFor="numInputs">Kaç adet giriş yapmak istiyorsunuz?</label>
        <input
          type="number"
          name="numInputs"
          id="numInputs"
          value={numInputs}
          onChange={handleNumInputsChange}
        />
      </div>
    );


    // Giriş alanlarını dinamik olarak oluşturalım
    const inputFields = [];
    for (let i = 0; i < numInputs; i++) {
      inputFields.push(
        <div key={i}>
          <label htmlFor={`input${i}`}>Giriş {i + 1}:</label>
          <input
            type="text"
            name={`input${i}`}
            id={`input${i}`}
            value={inputValues[i]}
            onChange={(event) => handleInputChange(event, i)}
          />
        </div>
      );
    }

    // Gönder butonu
    const submitButton = (
      <button type="submit">Birleştir</button>
    );

    return (
    <div className="App">
       <h1>{"Merhaba! ".toUpperCase()}</h1>
       <h2>Hazırsanız başlayalım.. Lütfen birleştirmek istediğiniz cümleleri giriniz!</h2>

      <form onSubmit={handleSubmit}>
        {numInputsField}
        {inputFields}
        {submitButton}
        <button>Kaydet</button>
      </form>
      <div>
            <p>Birleştirilmiş Cümle: {data1}</p>
            <p>Süre: {data2} nanosecond</p>
          </div>
      </div>
    );
  }

  export default App;