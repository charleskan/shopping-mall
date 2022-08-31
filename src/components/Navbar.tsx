import Link from "next/link";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import navbar from '../styles/Heading.module.css'

export function Navbar(){

return(
    <div className={navbar.color}>
        <span className={navbar.center}>
<MailIcon className={navbar.imageICon}/>
  
<a className={navbar.a}>@alex@gmail.com</a>

<PhoneIcon className={navbar.imageICon}/>
<a className={navbar.a}>12312123</a>
</span>
<span className={navbar.center}>


<LoginIcon className={navbar.imageICon}/>

<a className={navbar.a}>login</a>
<Link href='/shoppingCar'>
<ShoppingCartIcon className={navbar.imageICon}/>
</Link>
</span>




    </div>

)

}

