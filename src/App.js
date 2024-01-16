import './App.css';

import NavBar from './components/navbar';
import { HomePage } from './pages/homepage';
import { DetailsPage } from './pages/details';
import { AddForm } from './pages/addForm';
import { Login } from './pages/login';
import { Register } from './pages/register';

import {Route, Routes } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()


  return(
    <div id="main-container">
      <div id="app-container">

        {!(location.pathname === "/login" || location.pathname === "/register")&&
          <NavBar navigate={navigate} in_home={location.pathname === "/"}/>
        }

        <div id="myapp-container">        
          <Routes>
            <Route exact path="/" element={
              <HomePage navigate={navigate}/>
            }/>
            <Route exact path="/details/:id" element={
              <DetailsPage navigate={navigate}/> 
            }/>
            <Route exact path="/login" element={
              <Login navigate={navigate}/> 
            }/>
            <Route exact path="/add" element={
              <AddForm navigate={navigate}/>
            }/>
            <Route exact path="/register" element={
              <Register navigate={navigate}/>
            }/>
          </Routes>
        </div>
      </div>
    </div>
  )
};

export default App;
