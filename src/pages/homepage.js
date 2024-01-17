import { useEffect,useState } from 'react';

import { MySearch } from '../components/search';
import { User } from '../components/user';

import { PlusOutlined } from '@ant-design/icons';


export const HomePage=props=>{

    const {contacts,deleteContact,searchContact,contacts_search,navigate} = props
    const [contactList,setContactList] = useState([])

    useEffect(()=>{
      if(contacts_search !== null){
        setContactList(contacts_search)
      }else{
        setContactList(contacts)
      }
    },[contacts_search,contacts])

    return(
        <>
          <div id="home-head">
            <div>
              <h4>My Contacts</h4>
              <p className='paragraph-small'>{contactList.length} in your list</p>
            </div>
            <div id="add-container" onClick={()=>{navigate('/add')}}>
              <div className='btn-container'><PlusOutlined /></div>
              <div id="add-text">add</div>
            </div>
          </div>

            <MySearch search={searchContact}/>

            <div id="all-user">
                {contactList.map(user=>(
                    <User 
                      deleteContact={deleteContact} 
                      change={()=>{navigate('/details/'+user.id)}} 
                      key={user.id} 
                      name={user.first_name+" "+user.last_name} 
                      phone_number={user.phone_number} 
                      id={user.id}
                      background={user.background} 
                      />
                ))}
            </div>
        </>
    )
}