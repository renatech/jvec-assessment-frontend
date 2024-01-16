import { MySearch } from '../components/search';
import { User } from '../components/user';

import { PlusOutlined } from '@ant-design/icons';

const data=[
    {
      name:"Emmanuel Attah",
      phone_number:"+2349071780190",
      id:3
    },
    {
      name:"Serena williams",
      phone_number:"+2349071780190",
      id:4
    },
  ]

export const HomePage=props=>{

    const {navigate} = props

    return(
        <>
          <div id="home-head">
            <div>
              <h4>My Contacts</h4>
              <p className='paragraph-small'>256 in your list</p>
            </div>
            <div id="add-container" onClick={()=>{navigate('/add')}}>
              <div className='btn-container'><PlusOutlined /></div>
              <div id="add-text">add</div>
            </div>
          </div>

            <MySearch/>

            <div id="all-user">
                {data.map(user=>(
                    <User change={()=>{navigate('/details/'+user.id)}} key={user.id} name={user.name} phone_number={user.phone_number} id={user.id}/>
                ))}
            </div>
        </>
    )
}