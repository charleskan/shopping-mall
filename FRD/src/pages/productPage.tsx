import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import SlideFilter from '../components/SlideFilter'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid' // Grid version 1
import ProductList from '../components/ProductList'
import product from '../styles/Product.module.css'
import { useEffect, useState } from 'react'
import { log } from 'console'
import { PaginatedItems } from '../components/user/pagination'

interface product {
	id: number
	name: string
	icon: string
	description: string
}

const productPage: NextPage = () => {
	const [products, setProduct] = useState<product[]>([])


	const items = products

	async function fetchProduct() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
		)
		let product: Array<{id : number,name:string,icon:string,description:string}>= (await res.json()).allProductInfo
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

			<div className={product.pageBox}>
				<Container>
					<div>
						<h1 className={product.Title}>Product</h1>

						<span className={product.page}>Home. Pages.</span>
						<span className={product.nowPage}>Product</span>
					</div>
				</Container>
			</div>
			<Container>
				{/* <Container maxWidth='lg'>
			<Grid container spacing={2}>
				<Grid xs={4}>
				<SlideFilter />
				</Grid>
				<Grid xs={8}> */}
				{products.map((product) => (
					<ProductList
						id={product.id}
						name={product.name}
						description={product.description}
						icon={product.icon}
					/>
				))}
				
			
			</Container>
		</>
	)
}

export default productPage
