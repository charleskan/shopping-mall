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

import { fetchAddToCart } from '../../../redux/cart/action'
import { useAppDispatch } from '../../../store'
import {SelectColor} from '../../../components/SelectColor'
import React from 'react'
import { FormControl, FormLabel, RadioGroup } from '@mui/material'

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
interface addCart {
	productId: number
	colorId: number
	sizeId: number
}

interface productColor{
	name: string
}

interface productSize{
	name: string
}

const ProductDetails: NextPage = () => {

	const router = useRouter()
	const { id } = router.query
	// const carts = useAppSelector(state => state.cart.productIds)

	const [colorId, setColorId] = useState('')
	const [sizeId, setSizeId] = useState('')
	const [product, setProduct] = useState<product[]>([])

	const [addCart, setAddCart] = useState<addCart[]>([])
	const [productColor,setProductColor] = useState<productColor[]>([])
	const [productSize,setProductSize] = useState<productSize[]>([])

	const dispatch = useAppDispatch()

	async function fetchProduct() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailInfo/${id}`
		)
		let product = ((await res.json()).productInfo).productInfo
		setProduct(product)
	}

	async function fetchProductColorAndSize() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailByproductId/${id}`
		)
		let ColorAndSize =(await res.json()).productDetail
		let productColor = ColorAndSize.thisProductAllColors
		let productSize = ColorAndSize.thisProductAllSizes;


		
		setProductColor(productColor)
		setProductSize(productSize)
		console.log(productColor)
		console.log(productSize)
	}


	useEffect(() => {
		if (router.isReady) {
			const query = router.query.id
			const id = Number(query)

			fetchProduct()
		}
	}, [setProduct, router.isReady])

	useEffect(() => {
		if (router.isReady) {
			const query = router.query.id
			const id = Number(query)

			fetchAddToCart(id, Number(colorId), Number(sizeId))
		}
	}, [setAddCart, router.isReady])

	useEffect(() => {
		if (router.isReady) {
			const query = router.query.id
			const id = Number(query)

			fetchProductColorAndSize()
		}
	}, [setProductColor,setProductSize, router.isReady])

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

            <FormControl>
				<FormLabel id='demo-radio-buttons-group-label'>👿講吖！要咩色👿</FormLabel>
				<RadioGroup
					aria-labelledby='demo-radio-buttons-group-label'
					name='radio-buttons-group'>
            {productColor.map((productColor) => (
			<SelectColor name={productColor.name} />
			))}
				</RadioGroup>
			</FormControl>

			<FormControl>
				<FormLabel id='demo-radio-buttons-group-label'>😤俾埋Size我😤</FormLabel>
				<RadioGroup
					row
					aria-labelledby='demo-radio-buttons-group-label'
					name='radio-buttons-group'>
            {productSize.map((productSize) => (
			<SelectColor name={productSize.name} />
			))}
				</RadioGroup>
			</FormControl>

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
				dispatch(fetchAddToCart(
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
