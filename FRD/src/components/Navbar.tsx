import Link from 'next/link'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import navbar from '../styles/Navbar.module.css'
import img from '../components/Hektologo.png'
export function Navbar() {
	return (
		<div className={navbar.bar}>
			<div className={navbar.clickPage}>
				<div>
					<Image src={img} className={navbar.logo} />
				</div>

				<div className={navbar.page}>
					<Link href='/login'>
						<a className={navbar.pages}>Home</a>
					</Link>
					<Link href='/login'>
						<a className={navbar.pages}>Pages</a>
					</Link>
					<Link href='/login'>
						<a className={navbar.pages}>Products</a>
					</Link>
					<Link href='/login'>
						<a className={navbar.pages}>Blog</a>
					</Link>
					<Link href='/login'>
						<a className={navbar.pages}>Shop</a>
					</Link>
					<Link href='/login'>
						<a className={navbar.pages}>Contact</a>
					</Link>
				</div>
			</div>

			<form
				className={navbar.form}
				action='/send-data-here'
				method='post'>
				<input
					className={navbar.search}
					type='text'
					id='last'
					name='last'
				/>
				<button className={navbar.searchButton} type='submit'>
					<SearchIcon />
				</button>
			</form>

			
		</div>
		
	)
}