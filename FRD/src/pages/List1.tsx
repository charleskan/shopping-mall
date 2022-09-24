import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import SlideFilter from '../components/SlideFilter'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid' // Grid version 1
import ProductList from '../components/ProductList'
import product from '../styles/Product.module.css'
import { useEffect, useMemo, useState } from 'react'
import { log } from 'console'
import { useRouter } from 'next/router'
import { useAppSelector } from '../store'
import { useDispatch } from 'react-redux'

// interface product {
// 	id: number
// 	name: string
// 	icon: string
// 	description: string
// }

const productPage: NextPage = () => {

	// const [pageCount, setPageCount] = useState<Number>(90)

    
	const products = useAppSelector(state => state.product.products)

	const dispatch = useDispatch()

	// const pageCount = useMemo(() => {
	// 	let count = 0
		
		
	// }, [products])

	// function pageCount () {
	// 	let count = 0
	// 	for (let i = 0; i < products.length; i++) {
	// 		count += 1
	// 	}
	// 	return count
	// }

const pageCount = useMemo(() => {
	let count = 0
	for (let i = 0; i < products.length; i++) {
		count += 1
	}
	
	return count
}, [products])


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
					<button>{pageCount}</button>
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
