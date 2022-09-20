import { NextPage } from 'next'
import { Navbar } from '../../../components/Navbar'
import { HeadTitle } from '../../../components/HeadTitle'
import { Heading } from '../../../components/Heading'
import { Footer } from '../../../components/Footer'
import { DetailBox2 } from '../../../components/detailBox2'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { AddToCart } from '../../../components/AddToCart'
// import { useAppSelector } from '../../../store'
// import loginStyles from '../styles/Login.module.css'
import { useDispatch } from 'react-redux'
import { fetchAddToCart } from '../../../redux/cart/action'

interface product {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	Brand: string
}

interface productOption {
	id: number
	color: string
	size: string
}

const ProductDetails: NextPage = () => {

	const router = useRouter()
	const { id } = router.query
	// const carts = useAppSelector(state => state.cart.productIds)

	const [colorId, setColorId] = useState('')
	const [sizeId, setSizeId] = useState('')
	const [product, setProduct] = useState<product[]>([])
	const dispatch = useDispatch()

	async function fetchProduct() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailInfo/${id}`
		)
		let product = ((await res.json()).productInfo).productInfo
		setProduct(product)

		console.log(product)
	}
	useEffect(() => {
		if (router.isReady) {
			const query = router.query.id
			const id = Number(query)

			fetchProduct()
		}
	}, [setProduct, router.isReady])

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			{product.map((product) => (
				<DetailBox2
					id={product.id}
					name={product.name}
					icon={product.icon}
					image1={product.image1}
					image2={product.image2}
					image3={product.image3}
					Brand={product.Brand}
				/>
			))}
			{/* {product.map((product) => (
			<AddToCart id={product.id} color='' size=''/>
			))} */}
			<form>
				<input
					type='text'
					placeholder='colorId'
					value={colorId}
					onChange={(e) => setColorId(e.currentTarget.value)}
				/>
				<input
					type='text'
					placeholder='sizeId'
					value={sizeId}
					onChange={(e) => setSizeId(e.currentTarget.value)}
				/>
			<button type='submit'
			onClick={(e) => {
				e.preventDefault()
				dispatch<any>(fetchAddToCart(
					Number(id),
					Number(colorId),
					Number(sizeId)))

				
			}}
			>
				Add to Cart
			</button>
			</form>

			<Footer />
		</>
	)
}

export default ProductDetails
