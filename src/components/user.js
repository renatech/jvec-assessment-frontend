import { DeleteOutlined } from '@ant-design/icons';
import {Popconfirm, message  } from 'antd';

const colors = ['#4B55B7','#068EFE','#53D575']
const min = 0;
const max_num = colors.length - 1

function chooseBackground() {
    const index = Math.floor(Math.random() * (max_num - min + 1)) + min;
    return colors[index]
}

export const User=(props)=>{
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

    return(
        <div className="user-container">
            <div className="user-left" onClick={props.change}>
                <div className="user-icon" style={{backgroundColor:chooseBackground()}}>
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