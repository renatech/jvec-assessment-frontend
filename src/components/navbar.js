import '../App.css';
import { MenuOutlined,LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NavBar=props=>{
    const {in_home,navigate} = props

    const goback=()=>{
        if(!in_home){
            navigate(-1)
        }
    }

    return (
        <div id="navbar-container">
            <div id="navbar-icon" onClick={goback}>{in_home?<MenuOutlined />:<LeftOutlined />}</div>
            <div id="sign-in-container">
                <Button style={{backgroundColor:'transparent'}} onClick={()=>{
                    navigate("/login")
                }}>Sign In</Button>
            </div>
        </div>
    )
}

export default NavBar;