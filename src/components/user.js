import { DeleteOutlined } from '@ant-design/icons';
import {Popconfirm  } from 'antd';


export const User=(props)=>{
    const confirm = (e) => {
        console.log(e);
        // message.success('Click on Yes');
        props.deleteContact(props.id)
      };
      const cancel = (e) => {
        console.log(e);
      };

    return(
        <div className="user-container">
            <div className="user-left" onClick={props.change}>
                <div className="user-icon" style={{backgroundColor:props.background}}>
                    {props.name[0]}
                </div>
                <div className="user-info">
                    <div className="user-name">{props.name}</div>
                    <div className="user-phone">{props.phone_number}</div>
                </div>
            </div>
            <Popconfirm
                title="Delete the task"
                description="Are you sure?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <div className="icon-container"><DeleteOutlined /></div>
            </Popconfirm>
            
        </div>
    )
}