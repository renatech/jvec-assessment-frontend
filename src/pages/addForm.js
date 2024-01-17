import { MyForm } from '../form/builder';
import { useState,useEffect } from 'react';
import { UserOutlined,PhoneOutlined } from '@ant-design/icons';
import {message  } from 'antd';

import { clearFormData } from '../form/cleanup';


const form = [
    {
        id:"first_name",
        label:'First Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"John",
        icon:<UserOutlined style={{marginRight:'10px'}}/>
    },
    {
        id:"last_name",
        label:'Last Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"Doe",
        icon:<UserOutlined style={{marginRight:'10px'}}/>
    },
    {
        id:"phone_number",
        label:'Phone Number',
        value:"",
        type:"number",
        error:null,
        placeholder:"+234******",
        icon:<PhoneOutlined style={{marginRight:'10px'}}/>
    },
]

export const AddForm=props=>{
    const {setContacts,contacts,chooseBackground} = props
    const [formData,setFormData] = useState(form)

    useEffect(()=>{
        
        return ()=>{
            const newData = clearFormData(form)
            setFormData(newData)
        }
    },[])

    const success_prompt=(msg,data)=>{
        data.background = chooseBackground()
        const new_contact = [data,...contacts]
        setContacts(new_contact)
        message.success(msg)

        // clear form
        const newData = clearFormData(form)
        setFormData(newData)
    }

    return(
       <div id="add-form">
            <MyForm 
                method="POST"
                page="add-form"
                action="contact/"
                data={formData} 
                updateForm={setFormData} 
                btnType={"login"} 
                btnFunction={null}
                btnText={"Create contact"}
                prompt={success_prompt}
                cancel_btn={true}
            />
       </div>
    )
}