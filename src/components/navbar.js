import '../App.css';
import { MenuOutlined,LeftOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

import { setCookie } from '../Api/cookieHelper';

const NavBar=props=>{
    const {in_home,navigate} = props

    const goback=()=>{
        if(!in_home){
            navigate(-1)
        }
    }

    const logout = () => {
        setCookie('token',"",0)
        navigate("/login")
    };


      const items = [
        {
          key: '1',
          label: 'Logout',
        },
      ];
      

    return (
        <div id="navbar-container">
            <div id="navbar-icon" onClick={goback}>{in_home?<MenuOutlined />:<LeftOutlined />}</div>
            <div id="sign-in-container">
                
                {props.username?<Dropdown.Button
                    styles={{backgroundColor:'transparent'}}
                    menu={{
                        items,
                        onClick: logout,
                    }}
                    >
                    {props.username}
                </Dropdown.Button>
                :
                <Button style={{backgroundColor:'transparent'}} onClick={()=>{
                    navigate("/login")
                }}>Sign In</Button>
                }
            </div>
        </div>
    )
}

export default NavBar;