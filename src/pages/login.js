import { Input,Button  } from 'antd';

export const Login=(props)=>{
    return(
        <div id="login-container">

            <div>
                <div id="welcome-msg">
                    Welcome back!<br/> Sign in to continue
                </div>

                <div id="my-form">
                <Input onInput={(e)=>{
                    
                }} placeholder="Username" size="large" style={{backgroundColor:"transparent", marginBottom:'20px'}}/>
                

                <Input onInput={(e)=>{
        
                }} placeholder="Password" type='password'  size="large" style={{backgroundColor:"transparent", marginBottom:'20px'}}/>
                </div>

                <Button type="primary" block size='large'>Login</Button>
            </div>

            <div id="other-text">
                Don't have an account? <span id="text-bold" onClick={()=>{props.navigate("/register")}}>Sign up</span>
            </div>
        </div>

    )
}