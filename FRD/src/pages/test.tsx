import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AddColumn } from '../components/AddColumn'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import { SearchProductInfo } from './../components/SerachProduct'
import create from '../styles/CreateProduct.module.css'

FRD/src/pages/CreateProduct.tsx
interface keyword {
	keyword: string
}

interface searchProduct {
	id: number
	name: string
	icon: string
	description: string
}

const test: NextPage = () => {
	const [keyword, setkeyword] = useState<keyword['keyword']>('NOTAKEYWORD')
	const [product, setProduct] = useState<searchProduct[]>([])

	async function fetchSearchProduct(keyword: String) {
		const name = keyword

		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/searchProductIdByName/?keyword=${name}`
		)
		let product = (await res.json()).ProductList.rows
		console.log(product)
		setProduct(product)
	}

	useEffect(() => {
		fetchSearchProduct(keyword)
	}, [keyword])

	return (
		<>
				<Heading />
			<Navbar />
			<div >
			<div>
				<label htmlFor='keyword'>Serach Product:</label>
				<input
					placeholder='Search Product'
					type='text'
					onChange={(e) => setkeyword(e.target.value)}
				/>
				{product.map((product:searchProduct) => (
					<SearchProductInfo
						id={product.id}
						icon={product.icon}
						name={product.name}
						description={product.description}
					/>
				))}
			</div>
			<AddColumn />
			</div>
			<Footer />
		</>
	)
}

export default test 
