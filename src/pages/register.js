import { Input,Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { MyForm } from '../form/builder';

const form=[
    {
        label:'First Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"John"
    },
    {
        label:'Last Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"Doe"
    },
    {
        label:'Username',
        value:"",
        type:"text",
        error:null,
        placeholder:"JohnDoe"
    },
    {
        label:'Email',
        value:"",
        type:"email",
        error:null,
        placeholder:"John@doe.com"
    },
    {
        label:'Password',
        value:"",
        type:"password",
        error:null,
        placeholder:"********"
    },
]

export const Register=(props)=>{
    return(
        <div id="login-container">

            <div>
                <div id="welcome-msg">
                    Fill the form<br/> To register for My-Contact
                </div>

                <div id="my-form">
                    <MyForm data={form}/>
                </div>

                <Button type="primary" block size='large'>Login</Button>
            </div>

            <div id="other-text">
                Already have an account? <span id="text-bold" onClick={()=>{props.navigate("/login")}}>Sign in</span>
            </div>
        </div>

    )
}