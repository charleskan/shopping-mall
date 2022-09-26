import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import React, { useEffect, useMemo, useState } from 'react';
import { fetchAddToCart, fetchMinusFromCart, fetchRemoveFromCart, loadCart } from '../redux/cart/action';
import { useAppSelector, useAppDispatch } from '../store';
import { LoadingState } from '../models'
import { loadOneProduct } from '../redux/product/action'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Container } from '@mui/material'
import home from '../styles/Index.module.css'
import cart from '../styles/Cart.module.css'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import { PrintDisabled } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Checkout from '../components/Checkout'
import FreebieItem from '../components/FreebieItem'

interface product {

	product_name: string;
	icon: string;
	color_name: string;
	size_name: string;
	number: number;
	tc_price: number;
}

interface freebieArray {

}


const Cart: NextPage = () => {

	const cartLoaded = useAppSelector(state => state.cart.loading)
	const carts = useAppSelector(state => state.cart.products)

	const dispatch = useAppDispatch()

	const totalPrice = useMemo(() => {
		let total = carts.map((item) =>
			Number(item.product_price) * Number(item.tc_number))
			.reduce((a, b) => a + b, 0)

		return total;
	}, [carts])


	const [freebie, setFreebie] = useState<product[]>([])
	const [freebieArray, setFreebieArray] = useState([])

	async function fetchFreebie() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/freebie`,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})

		
		let freebie = await res.json()

		
		console.log('freebie:', freebie)
		
		setFreebie(freebie)
		setFreebieArray(freebie)
	} { }

	function loopFreebie(){
	for (let i = 0; i < freebie.length; i++) {

		const loopFreebie = freebie[i]
		return loopFreebie

	}
	}
	
	
	useEffect(() => {
		dispatch(loadCart())
		fetchFreebie()
	}, [setFreebie,totalPrice])


	const router = useRouter()

	return (

		<>
			<Heading />
			<Navbar />
			<Head>
				<title>Cart</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				{/* {console.log('carts:', carts)} */}
				{/* {console.log('cartLoaded:',cartLoaded ,)} */}
			</>
			<div className={cart.pageBox}>
				<Container>
					<div>
						<h1 className={cart.Title}>Cart</h1>
						<span className={cart.page}>Home. Pages.</span>
						<span className={cart.nowPage}>
							Cart
						</span>
					</div>
				</Container>
			</div>
			<Container>
				<div className={cart.box}>
					<div>

						{
							cartLoaded !== LoadingState.Loaded ?
								<Skeleton baseColor='#E02310' height={30} /> :
								carts.length > 0 ? carts.map(productInCart =>


									<CartItem
										key={productInCart.id}
										product={productInCart.product}
										icon={productInCart.icon}
										color={productInCart.color}
										size={productInCart.size}
										tc_number={productInCart.tc_number}
										tc_price={productInCart.tc_price}

										onMinusFromCart={() => dispatch(fetchMinusFromCart(productInCart.id))}
										onRemoveFromCart={() => dispatch(fetchRemoveFromCart(productInCart.id))}
										onAddToCart={() => dispatch(fetchAddToCart(productInCart.id))}

									/>

								)

									: <div className={cart.empty}>Cart is empty</div>

						}

						{
							
								
							cartLoaded !== LoadingState.Loaded ?
								<Skeleton baseColor='#E02310' height={30} /> :
								freebie.length > 0 ?
								
									freebie.map((item) => (
										<FreebieItem
											product={item.product_name}
											icon={item.icon}
											color={item.color_name}
											size={item.size_name}
											tc_number={item.number}
											tc_price={item.tc_price}

										/>
									))
									: <div>test</div>


						}



					</div>

					{cartLoaded !== LoadingState.Loaded ?
						<Skeleton circle borderRadius={50} /> :
						<div className={cart.totalBox} >
							<div className={cart.totalPriceDiv} >
								<div>Total:</div>
								<div className={cart.totalPrice}>{totalPrice}</div>

							</div>

							<Checkout />
						</div>

					}
				</div>

			</Container>
			<Footer />
		</>
	)
}


export default Cart