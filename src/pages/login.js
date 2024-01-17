import { MyForm } from '../form/builder';
import { useState, useEffect } from 'react';
import { clearFormData } from '../form/cleanup';

const form=[
    {
        id:"username",
        label:'Enter Username',
        value:"",
        type:"text",
        error:null,
        placeholder:"John"
    },
    {
        id:"password",
        label:'Enter Password',
        value:"",
        type:"password",
        error:null,
        placeholder:"***********"
    },
]

export const Login=(props)=>{
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
                    Welcome back!<br/> Sign in to continue
                </div>

                <div id="my-form">
                <MyForm 
                        method="POST"
                        page="login"
                        action="login/"
                        data={formData} 
                        updateForm={setFormData} 
                        btnType={"login"} 
                        btnFunction={null}
                        btnText={"Sign In"}
                    />
                </div>
            </div>

            <div id="other-text">
                Don't have an account? <span id="text-bold" onClick={()=>{props.navigate("/register")}}>Sign up</span>
            </div>
        </div>

    )
}