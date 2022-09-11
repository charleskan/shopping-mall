import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { ProductBigCard } from '../components/ProductBigCard'
import img from '../pages/photo/banner.png'
import styles from '../styles/Home.module.css'
import { Container } from '@mui/material'
import home from '../styles/Index.module.css'
import { title } from 'process'
import { Main } from 'next/document'
import ImageSlider from '../components/ImageSlider'
import { dataSlider } from '../components/DataSlider'
import Link from 'next/link'

const Home: NextPage = () => {

	// const dataSlider = [
	// 	{
	// 		id: 1,
	// 		image: 'https://i.ytimg.com/vi/XS71teFFdyk/maxresdefault.jpg',
	// 		title: 'man'
	// 	},
	// 	{
	// 		id: 2,
	// 		image: 'https://static.vecteezy.com/system/resources/thumbnails/001/426/892/small/abstract-banner-web-template-free-vector.jpg',
	// 		title: 'man'
	// 	},
	// 	{
	// 		id: 3,
	// 		image: 'https://static.vecteezy.com/system/resources/previews/003/355/926/original/business-banner-design-with-blue-wave-background-free-vector.jpg',
	// 		title: 'man'
	// 	}
	// ]
	const products = [
		{
			id: 1,
			name: 'bag',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			color: 'red',
			code: 'af123',
			price: 100
		},
		{
			id: 2,
			name: 'car',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			color: 'blue',
			code: 'af133',
			price: 120
		},
		{
			id: 3,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			color: 'black',
			code: 'af122',
			price: 130
		},

		{
			id: 4,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			color: 'black',
			code: 'af122',
			price: 130
		}
	]

	const productCards = [
		{
			id: 1,
			name: 'bag',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		},
		{
			id: 2,
			name: 'car',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		},
		{
			id: 3,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		},
		{
			id: 4,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		},
		{
			id: 5,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		},
		{
			id: 6,
			name: 'table',
			image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658940346/631685_2KQGG_8375_001_100_0000_Light-Ophidia-GG-medium-tote.jpg',
			specialPrice: 200,
			price: 100
		}
	]

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Heading />
			<Navbar />
			<div>
				<ImageSlider slides={dataSlider}/>
				</div>
			
			
			<Container>
				<div className={home.productCardTitle}>Featured Product</div>
				<div className={styles.productcard}>
					{products.map((product) => (
						<ProductCard
							key={product.id}
							name={product.name}
							image={product.image}
							color={product.color}
							code={product.code}
							price={product.price}
						/>
					))}
				</div>
				<div className={home.productCardTitle}>Leatest Product</div>
				<div className={styles.productcard}>
					{productCards.map((productCard) => (
						<ProductBigCard
							key={productCard.id}
							name={productCard.name}
							image={productCard.image}
							specialPrice={productCard.specialPrice}
							price={productCard.price}
						/>
					))}
				</div>
			</Container>
			<div className={home.bannerBox}>
			<Image className={home.banner} src={img}/>
			<div className={home.titleBox}>
			<div className={home.title} >Get Leatest Update By Subscribe<br/>
			Our Newslater</div>
			<Link href="/login"><a className={home.button}>Shop Now</a></Link>
			</div>
			
		

			</div>
			<Footer />
		</div>
	)
}

export default Home