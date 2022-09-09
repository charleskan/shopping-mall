import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'

export function Heading() {
	return (
		<div className={heading.color}>
			<div className={heading.center}>
				<MailIcon className={heading.imageICon} />

				<a className={heading.a}>@alex@gmail.com</a>

				<PhoneIcon className={heading.imageICon} />
				<a className={heading.a}>12312123</a>
			</div>
			<div className={heading.center}>
				<Link href='/login'>
					<LoginIcon className={heading.imageICon} />
					</Link>
					<Link href='/login'>
					<a className={heading.a}>login</a>
					</Link>
				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</div>
		</div>
	)
}
