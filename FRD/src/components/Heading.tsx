import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { logOut } from '../redux/auth/action'

export function Heading() {
	const token = useAppSelector((state) => state.auth.token)

	const [username, setUsername] = useState<string | null>(null);
	useEffect(() => {
		setUsername(typeof window !== 'undefined' ? localStorage.getItem('username')! : null)
	}, [setUsername])
	// const username: any = useAppSelector((state) => state.auth.username)
	
	// const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
	const dispatch = useAppDispatch();

	const [users, setUsers] = useState('')

	// async function main() {
	// 	console.log('main')
	// }
	
	// useEffect(() => {
	// 	setUsers(username!)
	// }, [token, username, users])



	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<MailIcon className={heading.imageICon} />
{/* 
				// {username === undefined || (
				// 	<div className={heading.a}>{users}</div>
				// )} */}
			</div>
			<div className={heading.center}>
				{!username ? (
					<Link href='/login'>
						<button className={heading.a}>
							<LoginIcon className={heading.imageICon} />
							login
						</button>
					</Link>
				) : (

					<button className={heading.a} 
					onClick={() => dispatch(logOut())}>
						logout
					</button>

				)}
				{/* {isLoggedIn === true && (
					<a
						href="#"
						onClick={() => {
							dispatch(logOut());
						}}
					>
						<LoginIcon className={heading.imageICon} />
						Logout
					</a>
				)} */}

				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</div>
		</div>
	)
}
