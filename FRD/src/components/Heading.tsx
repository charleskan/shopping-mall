import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/store'
import { useDispatch } from 'react-redux'
import { loggedOut, logOut } from '../../redux/auth/action'

export function Heading() {
	const token = useAppSelector((state) => state.auth.token)
	const username: any = useAppSelector((state) => state.auth.username)
	const logOut = useAppSelector((state) => state.auth.log)
	const [users, setUsers] = useState('')
	const dispatch = useDispatch()
	console.log('token:', username, token)

	async function main() {
		setUsers(username)
		console.log('main')
	}

	useEffect(() => {
		main()
	}, [token, username, users])

	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<MailIcon className={heading.imageICon} />

				{username === undefined || (
					<div className={heading.a}>{users}</div>
				)}
			</div>
			<div className={heading.center}>
				{username === undefined ? (
					<Link href='/login'>
						<button className={heading.a}>
							<LoginIcon className={heading.imageICon} />
							login
						</button>
					</Link>
				) : (
					<button className={heading.a} onClick={()=> dispatch(logOut())}>
						<LoginIcon className={heading.imageICon} />
						logout
					</button>
				)}

				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</div>
		</div>
	)
}
