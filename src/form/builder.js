import { useState } from 'react';
import { Input,Button,Flex } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { manageServerCall } from '../Api/serverCall';
import { setCookie } from '../Api/cookieHelper';

import { useNavigate } from 'react-router-dom';


export const MyForm=(props)=>{
    const navigation = useNavigate()

    const [btnLoading,setBtnLoading] = useState(false)
    const [formError,setFormError] = useState(null)

    const {data,updateForm,btnText,cancel_btn,method,page,action} = props

    const isValidEmail = (email) => {
        // Basic email validation, you might want to use a more robust solution
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const submitForm=()=>{
        if(!validate_form()){
            
            const formData = getFormData()
        
            //send to server here with manageservercall
            setBtnLoading(true)

            const add_token_cookie = (page === 'login' || page === 'register')?false:true

            manageServerCall(method,action,formData,add_token_cookie)
            .then(res=>{
                setBtnLoading(false)
                setFormError(null)
                
                if(res.hasOwnProperty('token')){
                    setCookie('token',res.token,2)
                }

                if(page === "details"){
                    props.prompt("Contact updated",res)

                }else if( page === "add-form"){
                    props.prompt("Contact added",res)
                }
                else{
                    navigation('/')
                }
                
            })
            .catch(err=>{
                console.log(err,"mewo");
                setBtnLoading(false)
                if(page === 'login'){
                    setFormError("Invalid Username or Password")

                }else if(page === 'register'){
                    const form = [...data]

                    for (let i in err){
                        const field = form.find(e=>{return e.id === i})
                        const index = form.indexOf(field)

                        field.error = err[i][0]
                        form[index] = field
                    }
                    updateForm(form)
                }
            })
            // if page is login or register save cookie
        }
    }

    const getFormData=()=>{
        const form = new FormData()

        const formData = [...data]

        for (let i = 0; i < formData.length; i++) {
            const field = formData[i];
            form.append(field.id,field.value)
        }

        return form
    }

    const updateInput=(key,value)=>{
        const formData = [...data]

        const field = formData.find(e=> {return e.id === key})
        const index = formData.indexOf(field)
        field.value = value

        formData[index] = field

        updateForm(formData)
    }

    const validate_form=()=>{
        const formData = [...data]
        let has_error = false

        for (let i = 0; i < formData.length; i++) {
            const field = formData[i];

            let error = ""

            if(field.value.trim() === ''){
                error = "This field is required"
            }

            if(field.type === "password" && field.value.length < 8){
                error = "Password must be 8 characters or longer"
            }

            if(field.type === "email" && field.value.length > 0){
                if(!isValidEmail(field.value)){
                    error = "Please use a valid email"
                }
            }


            if(error.length > 0){
                formData[i]['error'] = error
                has_error = true
            }else{
                formData[i]['error'] = null
            }
            
        }
        
        updateForm(formData)

        return has_error
    }
    return(
        <>
            {formError&&<div id="main-error">Invalid Username or Password</div>}
            {data.map((field)=>(
                <div key={"filed_"+field.id}>
                    <div className='form-label-container'>
                        <div className='label'>{field.label}</div>
                        {field.error&&<div className='error-container'>
                            <div className='icon-container'><ExclamationCircleOutlined style={{fontSize:'14px',color:'#ff4d4f'}}/></div>
                            <div className='error'>{field.error}</div>
                        </div>}
                    </div>
                    <Input 
                        status={field.error?'error':null} 
                        onInput={(e)=>{updateInput(field.id,e.target.value)}} 
                        placeholder={field.placeholder}
                        type={field.type}
                        size="large" 
                        value={field.value}
                        prefix={field.icon?field.icon:null}
                        style={{backgroundColor:"transparent", marginBottom:'20px'}}
                    />

                </div>
            ))}

            {cancel_btn?
                <div id="form-btn">
                <Flex gap="small">
                    <Button size='large' style={{backgroundColor:'transparent'}} block onClick={()=>{navigation(-1)}}>
                        Cancel
                    </Button>
                    <Button size='large' loading={btnLoading} type="primary" block onClick={submitForm}>Create contact</Button>
                </Flex>
                </div>
            :
                <Button type="primary" loading={btnLoading} block size='large' onClick={submitForm}>{btnText}</Button>}
        </>
    )
}