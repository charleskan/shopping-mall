import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import SlideFilter from '../components/SlideFilter'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid' // Grid version 1
import ProductList from '../components/ProductList'

const productPege: NextPage = () => {
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
				<ProductList />
				</Grid>
			</Grid>
			</Container>

		</>
	)
}

export default productPege
