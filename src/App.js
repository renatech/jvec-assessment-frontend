import { useState,useEffect } from 'react';

import './App.css';

import NavBar from './components/navbar';
import { HomePage } from './pages/homepage';
import { DetailsPage } from './pages/details';
import { AddForm } from './pages/addForm';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { manageServerCall } from './Api/serverCall';
import { getCookie } from './Api/cookieHelper';

import {Route, Routes } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import { arraysOfObjectsAreEqual } from './utils';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [contacts, setContacts] = useState([])
  const [contacts_search, setContacts_search] = useState(null)

  const colors = ['#4B55B7','#068EFE','#53D575']
  const min = 0;
  const max_num = colors.length - 1

  function chooseBackground() {
      const index = Math.floor(Math.random() * (max_num - min + 1)) + min;
      return colors[index]
  }

  const getContacts=()=>{
    manageServerCall('GET','contact/',null,true)
    .then(res=>{

      const data = [...res]

      const oldArray = contacts.map(obj => {
        const { background, ...rest } = obj;
        return rest;
      });

      const newArray = data.map(obj => {
        const { background, ...rest } = obj;
        return rest;
      });


      if(!arraysOfObjectsAreEqual(newArray,oldArray)){
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          element.background = chooseBackground()
        }

        setContacts(data)
      }
      
    })
  }

  const searchContact = (query) => {
    let data = [...contacts];
    
    data = data.filter(contact => {
        const firstNameLowerCase = contact.first_name.toLowerCase();
        const lastNameLowerCase = contact.last_name.toLowerCase();
        const queryLowerCase = query.toLowerCase();

        const name = firstNameLowerCase+ " " + lastNameLowerCase
        
        return name.includes(queryLowerCase);
    });

    setContacts_search(data);
}


  const deleteContact=(id)=>{
    return new Promise((resolve,reject)=>{
      manageServerCall('DELETE','contact/'+id+"/",null,true)
      .then(res=>{
        let data = [...contacts]

        data = data.filter(e=>{
          return e.id !== id
        })

        setContacts(data)
        resolve(true)
      })
    })
  }

  const [username, setUsername] = useState(null)

  const getUserLogInInfo=()=>{
    manageServerCall('GET','user/',null,true)
    .then(res=>{
      setUsername(res.username)
    })
  }

  useEffect(() => {

    if (location.pathname === '/') {
      if (getCookie('token').length > 0) {
        getUserLogInInfo();
        getContacts();
      } else {
        navigate('/login');
      }
    }
  }, [location.pathname]);


  return(
    <div id="main-container">
      <div id="app-container">

        {!(location.pathname === "/login" || location.pathname === "/register")&&
          <NavBar username={username} navigate={navigate} in_home={location.pathname === "/"}/>
        }

        <div id="myapp-container">        
          <Routes>
            <Route exact path="/" element={
              <HomePage 
                navigate={navigate} 
                deleteContact={deleteContact}
                contacts={contacts}
                searchContact={searchContact}
                contacts_search={contacts_search}
                />
            }/>
            <Route exact path="/details/:id" element={
              <DetailsPage 
                navigate={navigate} 
                contacts={contacts} 
                setContacts={setContacts}
                deleteContact={deleteContact}
              /> 
            }/>
            <Route exact path="/login" element={
              <Login navigate={navigate}/> 
            }/>
            <Route exact path="/add" element={
              <AddForm 
                navigate={navigate} 
                contacts={contacts} 
                setContacts={setContacts}
                chooseBackground={chooseBackground}/>
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
