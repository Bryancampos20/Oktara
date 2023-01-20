import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Container} from 'react-bootstrap';

function App() {
    return(
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand >Oktara Warehouse</Navbar.Brand>
          </Container>
        </Navbar>
    );
}

export default App;