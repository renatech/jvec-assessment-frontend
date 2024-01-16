import '../App.css';
import { DeleteOutlined,EditOutlined,ShareAltOutlined } from '@ant-design/icons';
import { Input,Button, Flex,Popconfirm, message  } from 'antd';
import { useState } from 'react';


const form_template = {
    name:"",
    phone:""
}

export const DetailsPage=props=>{
    const [isEdit,setEdit] = useState(false)
    const [editData, setEditData] = useState(form_template)

    const onFormInputChange=(key,val)=>{
        const data = {...editData}
        data[key] = val
        setEditData(data)
    }

    const submitEditForm=()=>{
        //submit form here
    }

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

    return(
        <>
            <div id="details-page-container">
                <div id="user-logo">J</div>
                <div id="details-card">
                    {isEdit?
                    <div id="edit-form">
                        <Input onInput={(e)=>{
                            onFormInputChange('name',e.target.value)
                        }} placeholder="Name"  style={{width:"70%",marginBottom:'20px'}}/>
                        <Input onInput={(e)=>{
                            onFormInputChange('phone',e.target.value)
                        }} placeholder="Phone number" style={{width:"70%",marginBottom:'20px'}}/>

                        <Flex gap="small" wrap="wrap">
                            <Button size="small" type="primary" onClick={submitEditForm}>Edit</Button>
                            <Button size="small" onClick={()=>{setEdit(false)}}>Cancel</Button>
                        </Flex>
                    </div>
                    :
                    <>
                        <div className="user-name">John Doe</div>
                        <div className="user-phone">97657643421</div>
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
                    </>}
                </div>
                <div id="details-history-container">
                    <div id="history-header">History</div>
                </div>
            </div>
        </>
    )
}