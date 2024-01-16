import { Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const MyForm=(props)=>{
    const {data} = props

    const isValidEmail = (email) => {
        // Basic email validation, you might want to use a more robust solution
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const validate_form=()=>{
        const formData = {...data}
        let has_error = false

        for (const key in formData) {

            let error = null

            if (Object.hasOwnProperty.call(formData, key)) {
                const field = formData[key];

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

                if(error){
                    formData[key]['error'] = error
                    has_error = true
                }
                
            }
        }
        return [formData,has_error]
    }
    return(
        <>
            {data.map(field=>(
                <>
                    <div className='form-label-container'>
                        <div className='label'>{field.label}</div>
                        {field.error&&<div className='error-container'>
                            <div className='icon-container'><ExclamationCircleOutlined style={{fontSize:'14px',color:'#ff4d4f'}}/></div>
                            <div className='error'>{field.error}</div>
                        </div>}
                    </div>
                    <Input 
                        status={field.error?'error':null} 
                        onInput={(e)=>{}} 
                        placeholder={field.placeholder}
                        size="large" 
                        style={{backgroundColor:"transparent", marginBottom:'20px'}}
                    />

                </>
            ))}
        </>
    )
}