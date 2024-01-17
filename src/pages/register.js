import { MyForm } from '../form/builder';
import { useState, useEffect } from 'react';
import { clearFormData } from '../form/cleanup';

const form=[
    {
        id:"first_name",
        label:'First Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"John"
    },
    {
        id:"last_name",
        label:'Last Name',
        value:"",
        type:"text",
        error:null,
        placeholder:"Doe"
    },
    {
        id:"username",
        label:'Username',
        value:"",
        type:"text",
        error:null,
        placeholder:"JohnDoe"
    },
    {
        id:"email",
        label:'Email',
        value:"",
        type:"email",
        error:null,
        placeholder:"John@doe.com"
    },
    {
        id:"password",
        label:'Password',
        value:"",
        type:"password",
        error:null,
        placeholder:"********"
    },
]

export const Register=(props)=>{
    const [formData,setFormData] = useState(form)
    
    useEffect(()=>{
        
        return ()=>{
            const newData = clearFormData(form)
            setFormData(newData)
        }
    },[])

    return(
        <div id="login-container">

            <div>
                <div id="welcome-msg">
                    Fill the form<br/> To register for My-Contact
                </div>

                <div id="my-form">
                    <MyForm 
                        method="POST"
                        page="register"
                        action="register/"
                        data={formData} 
                        updateForm={setFormData} 
                        btnType={"login"} 
                        btnFunction={null}
                        btnText={"Sign Up"}
                    />
                </div>
            </div>

            <div id="other-text">
                Already have an account? <span id="text-bold" onClick={()=>{props.navigate("/login")}}>Sign in</span>
            </div>
        </div>

    )
}