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
const username:any = useAppSelector (state => state.auth.username)

console.log("token:",username);

async function main(){

	setUsers(username)

	
}



useEffect(() => {
	if(token){main()}
	
}, [])


	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<MailIcon className={heading.imageICon} />

				{username &&<a className={heading.a}>{users}</a>}

				<PhoneIcon className={heading.imageICon} />
				<a className={heading.a}>12312123</a>
			</div>
			<div className={heading.center}>

					<Link href='/login'>
					{<button className={heading.a}><LoginIcon className={heading.imageICon} />login</button>}
					</Link>
				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</div>
		</div>
	)
}
