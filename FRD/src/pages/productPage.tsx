import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import SlideFilter from '../components/SlideFilter'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid' // Grid version 1
import ProductList from '../components/ProductList'

import { useEffect, useState } from 'react'
import { log } from 'console'


interface product {
	id:number,
	name: string,
	icon: string,
	description: string,

}

const productPage: NextPage = () => {

	const [products, setProduct] = useState<product[]>([])

	async function fetchProduct() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
		)
		let product = (await res.json()).allProductInfo
		setProduct(product)
		console.log(product)
	}{}

	useEffect(()=>{
		fetchProduct()
	},[setProduct])



	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			<Container maxWidth='lg'>
			<Grid container spacing={2}>
				<Grid xs={4}>
				<SlideFilter />
				</Grid>
				<Grid xs={8}>
				{products.map((product) => (
						<ProductList
							id={product.id}
							name={product.name}
							description={product.description}
							icon={product.icon}/>
					))}
				</Grid>
			</Grid>
			</Container>

		</>
	)
}

export default productPage
