import Link from 'next/link'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'

export function Heading() {
	return (
		<div className={heading.color}>
			<span className={heading.center}>
				<MailIcon className={heading.imageICon} />

				<a className={heading.a}>@alex@gmail.com</a>

				<PhoneIcon className={heading.imageICon} />
				<a className={heading.a}>12312123</a>
			</span>
			<span className={heading.center}>
				<LoginIcon className={heading.imageICon} />

				<a className={heading.a}>login</a>
				<Link href='/shoppingCar'>
					<ShoppingCartIcon className={heading.imageICon} />
				</Link>
			</span>
		</div>
	)
}
