import '../App.css';
import { isValidElement, useState } from "react";
import Axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Navbar';
import Button from "react-bootstrap/Button";
import { GetCoordinates } from "../getCoordinates"


const App = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [packageList, setPackageList] = useState([]);

  const getCoordinates = async(e) => {
    let coord = await GetCoordinates(e.address);
    let coordinatesJson = JSON.stringify(coord)

    fetch('http://localhost:3000/', {   // sending data (coordinates) from front-end to back-end
    method: 'Post',
    body: coordinatesJson
  })
  }

  const setData = (e) => {
    props.onNewPackage(e);   // sending data to the useState from Map component  
    getCoordinates(e)       // getting coordinates of the input address 
  };

  // Render Views
  const [goMap, setGoMap] = useState(true);
  const [isForm, setViewPackage] = useState(true);
  const [isCard, setViewMap] = useState(false);

  const backToHome = () => {   // funcion for render the home
    setViewPackage(true);
    setViewMap(false);

    setGoMap(true);
  };
  const deliver = () => {   // funcion for render the map

    setViewPackage(false);
    setViewMap(true);

    setGoMap(false);
  };

  const addPackage = () => {
    Axios.post('http://localhost:3001/create',{
      name: name, 
      lat: lat,
      lng: lng
    }).then((() => {
      console.log ("success");
    }));
  };

  const getPackages = () => {
    Axios.get('http://localhost:3001/packages').then((response) => {
      setPackageList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <Header />
        <Button
          variant="success"
          size="sm"
          onClick={goMap ? deliver : backToHome}
        >
          {goMap ? "Deliver" : "Back"}
        </Button>
        <p></p>
        <div class="container">
          <label>Package: </label>
          <input type="text" 
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Latitude: </label>
          <input type="number" 
            onChange={(event) => {
              setLat(event.target.value);
            }}
          />
          <label>Longitude: </label>
          <input type="number" 
            onChange={(event) => {
              setLng(event.target.value);
            }}
          />
          <button onClick={addPackage}>Add Package</button>
        </div>
        <hr></hr>
        <div className= "packages">
          <button onClick = {getPackages}>Show Packages</button>
          {packageList.map((val, key) => {
            return <div className = "package">
              <h3>Package: {val.name}</h3>
              <h3>Latitude: {val.lat}</h3>
              <h3> Longitude: {val.lng}</h3>
              </div>
          })}
        </div>
      </div>
    </div>
  );
};
export default App;