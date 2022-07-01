
import './App.css';
import ListEmployess from './Components/ListEmployess';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CreateEmployee from './Components/CreateEmployee';
import { BrowserRouter as Router,Routes, Route ,Link } from 'react-router-dom';
import ViewEmployee from './Components/ViewEmployee';
function App() {
  return (
    <div className='App'>
      <Router>  
        <Header />   
        <div className='container'>
          <Routes>
            <Route path="/" exact element={ <ListEmployess />}></Route>
            <Route path="/add-employee/:id" element={ <CreateEmployee/>}></Route>
            <Route path="/view-employee/:id" element={ <ViewEmployee/>}></Route>
          </Routes>
  

        </div>
        <Footer />
      </Router>

    </div>
  );
}

export default App;

