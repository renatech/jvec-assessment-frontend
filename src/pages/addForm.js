import { UserOutlined,PhoneOutlined } from '@ant-design/icons';

import { Button, Flex, Input } from 'antd';

export const AddForm=props=>{
    return(
       <div id="add-form">
         <div className='form-input'><Input style={{backgroundColor:"transparent"}} size="large" placeholder="John Doe" prefix={<UserOutlined style={{marginRight:'10px'}}/>}/></div>
         <div className='form-input'><Input type='number' style={{backgroundColor:"transparent"}} size="large" placeholder="+234..." prefix={<PhoneOutlined style={{marginRight:'10px'}}/>}/></div>
       
        <div id="form-btn">
            <Flex gap="small">
                <Button style={{backgroundColor:'transparent'}} block>
                    Cancel
                </Button>
                <Button type="primary" block>Create contact</Button>
            </Flex>
        </div>
       </div>
    )
}