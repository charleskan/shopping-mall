import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/store'


export function Heading() {
const [users, setUsers] = useState<any[]>([])
const token = useAppSelector (state => state.auth.token)
console.log("token:",token);

async function main(){
	if(token == null){
		return
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/`,{
		headers:{
			Authorization:`bearer${token}`,
		}
	})
	const json =await res.json();

	setUsers(json)
	console.log("json:",json);
	
}



useEffect(() => {
	if(token){main()}
	
}, [token])


	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<MailIcon className={heading.imageICon} />

				{users&&<a className={heading.a}></a>}

				<PhoneIcon className={heading.imageICon} />
				<a className={heading.a}>12312123</a>
			</div>
			<div className={heading.center}>
				<Link href='/login'>
					<LoginIcon className={heading.imageICon} />
					</Link>
					<Link href='/login'>
					{<a className={heading.a}>login</a>}
					</Link>
				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</div>
		</div>
	)
}
