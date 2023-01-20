import Header from './Navbar';
import GoogleMaps from "simple-react-google-maps";
import {useState} from "react";
import Button from "react-bootstrap/Button";

const Map = () => {

  const [coordinates, setCoordinates] = useState([]);

  const getCoordinates = async (address) => {
      
    fetch('http://localhost:3000/location').then(x => x.json()).then(coord => setCoordinates(...coordinates, coord))
    
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

  return (
    <div>
        <Header />
        <Button
          variant="success"
          size="sm"
          onClick={goMap ? deliver : backToHome}
          >
          {goMap ? "Deliver" : "Back"}
        </Button>
        <GoogleMaps
              apiKey={"AIzaSyDwjgzTrecAmbLJzuSwSbL8pb1dXoIKu8M"}
              style={{ height: "700px", width: "1345px" }}
              zoom={8}
              center={{
                lat: 9.93333, lng: -84.08333
              }}
              markers={coordinates}
            />      
    </div>
  )
}

export default Map;