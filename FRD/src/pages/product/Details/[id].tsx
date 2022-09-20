import { NextPage } from 'next'
import { Navbar } from '../../../components/Navbar'
import { HeadTitle } from '../../../components/HeadTitle'
import { Heading } from '../../../components/Heading'
import { Footer } from '../../../components/Footer'
import { DetailBox2 } from '../../../components/detailBox2'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AddToCart } from '../../../components/AddToCart'

interface product {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	Brand: string
}
<<<<<<< HEAD

interface productOption {
	id: number
	color: string
	size: string
}

const ProductDetails: NextPage = () => {
	const router = useRouter()
	const { id } = router.query

	const [product, setProduct] = useState<product[]>([])

	async function fetchProduct() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailInfo/${id}`
		)
		let product = (await res.json()).productInfo.productInfo
		setProduct(product)

		console.log(product)
	}

	useEffect(() => {
		fetchProduct()
	}, [setProduct])

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
			{product.map((product) => (
			<AddToCart id={product.id} color='' size=''/>
			))}
			<Footer />
		</>
	)
}

export default ProductDetails
