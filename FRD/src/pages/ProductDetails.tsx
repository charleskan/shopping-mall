import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import { Footer } from '../components/Footer'
import { DetailBox } from '../components/detailBox'
import { useEffect, useState } from 'react'

const ProductDetails: NextPage = () => {
	// interface ProductDetails {
	// 	id: number
	// 	name: string
	// 	icon: string
	// 	image1: string
	// 	image2: string
	// 	image3: string
	// 	price: any
	// }

	// const [productsdetial, setProductDetail] = useState<ProductDetails[]>([])

	// async function fetchProductDetail() {
	// 	let res = await fetch(
	// 		`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailInfo/1`
	// 	)
	// 	let product = (await res.json()).allProductInfo
	// 	setProductDetail(productsdetial)
	// }
	// {
	// }

	// useEffect(() => {
	// 	fetchProductDetail()
	// }, [setProductDetail])

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			<DetailBox
				// id={productsdetial.id}
				// name={productsdetial.name}
				// icon={productsdetial.icon}
				// image1={productsdetial.image1}
				// image2={productsdetial.image2}
				// image3={productsdetial.image3}
				// price={productsdetial.price}
			/>

			<Footer />
		</>
	)
}

export default ProductDetails
