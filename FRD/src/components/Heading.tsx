import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { logOut } from '../redux/auth/action'

export function Heading() {
	const token = useAppSelector((state) => state.auth.token)
	const cartCount = useAppSelector(state => state.cart.productDetailIds)

	const [username, setUsername] = useState<string | null>(null);
	useEffect(() => {
		setUsername(typeof window !== 'undefined' ? localStorage.getItem('username')! : null)
	}, [setUsername])
	// const username: any = useAppSelector((state) => state.auth.username)

	// const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
	const dispatch = useAppDispatch();

	// const [users, setUsers] = useState('')


	// useEffect(() => {
	// 	setUsers(username!)
	// }, [token, username, users])



	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<PersonIcon className={heading.imageICon} />

				{username === undefined || (
					<div className={heading.a}>{username}</div>
				)}
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
<Link href='/login'>
					<button className={heading.a}
						onClick={() => dispatch(logOut())}><LogoutIcon />logout
						
					</button>
					</Link>

				)}

				<Link href='/Cart'>
					<ShoppingCartIcon className={heading.imageICon}/>
				</Link>
					{cartCount.length}
			</div>
		</div>
	)
}
