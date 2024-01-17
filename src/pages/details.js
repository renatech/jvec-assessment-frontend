import '../App.css';
import { DeleteOutlined,EditOutlined,ShareAltOutlined,UserOutlined,PhoneOutlined  } from '@ant-design/icons';
import {Popconfirm, message  } from 'antd';
import { useState, useEffect } from 'react';

import { MyForm } from '../form/builder';
import { clearFormData } from '../form/cleanup';

import { useParams } from 'react-router-dom';

import { getCookie } from '../Api/cookieHelper';


export const DetailsPage=props=>{
    const [isEdit,setEdit] = useState(false)
    const [editData, setEditData] = useState([])

    const [current,setCurrent] = useState({
        first_name:"John",
        last_name:"Doe",
        phone_number:"+234687878"
    })

    const {contacts,setContacts,deleteContact,navigate} = props

    const params = useParams()
    const id = parseInt(params.id)
    
    useEffect(()=>{

        if(contacts.length > 0){
            const contact = contacts.find(e=>{
                return e.id === id
            })

            setCurrent(contact)
    
            const form = [
                {
                    id:"first_name",
                    label:'First Name',
                    value:current.first_name,
                    type:"text",
                    error:null,
                    placeholder:"John",
                    icon:<UserOutlined style={{marginRight:'10px'}}/>
                },
                {
                    id:"last_name",
                    label:'Last Name',
                    value:current.last_name,
                    type:"text",
                    error:null,
                    placeholder:"Doe",
                    icon:<UserOutlined style={{marginRight:'10px'}}/>
                },
                {
                    id:"phone_number",
                    label:'Phone Number',
                    value:current.phone_number,
                    type:"number",
                    error:null,
                    placeholder:"+234******",
                    icon:<PhoneOutlined style={{marginRight:'10px'}}/>
                },
            ]

            setEditData(form)
        }

    },[contacts,id,current])

    useEffect(()=>{
        if(!isEdit){
            const newForm = clearFormData(editData)
            setEditData(newForm)
        }
    },[isEdit])

    useEffect(() => {

        if (getCookie('token').length === 0) {
            navigate('/login');
        }

      }, []);

    const confirm = (e) => {
        deleteContact(id)
        .then(res=>{
            navigate("/")
        })
      };
      const cancel = (e) => {
        // console.log(e);
      };

      const success_prompt=(msg,data)=>{
        let new_data = [...contacts]
        const current = new_data.find(e=>{return e.id === id})
        const index = new_data.indexOf(current)

        current.first_name = data.first_name
        current.last_name = data.last_name
        current.phone_number = data.phone_number

        new_data[index] = current

        setContacts(new_data)

        message.success(msg)
        setEdit(false)
    }

    return(
        <>
            <div id="details-page-container">
                {current&&<div id="user-logo" style={{backgroundColor:current.background}}>{current.first_name[0]}</div>}
                <div id="details-card">
                    {isEdit?
                    <div id="edit-form">
                        <MyForm 
                            method="PUT"
                            page="details"
                            action={"contact/"+params.id+"/"}
                            prompt={success_prompt}
                            data={editData} 
                            updateForm={setEditData} 
                            btnType={"login"} 
                            btnFunction={null}
                            btnText={"Create contact"}
                            cancel_btn={true}
                            cancel_function={()=>{setEdit(false)}}
                        />
                    </div>
                    :
                    current&&<>
                        <div className="user-name">{current.first_name} {current.last_name}</div>
                        <div className="user-phone">{current.phone_number}</div>
                        <div id="btn-container">
                            <button className="btn" onClick={()=>{setEdit(true)}}><EditOutlined /></button>
                            <button className="btn"><ShareAltOutlined /></button>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button className="btn"><DeleteOutlined /></button>
                            </Popconfirm>
                        </div>
                    </>
                }
                </div>
                <div id="details-history-container">
                    <div id="history-header">History</div>
                </div>
            </div>
        </>
    )
}