import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import SlideFilter from '../components/SlideFilter'
import { Container } from '@mui/system'

const productPage: NextPage = () => {
	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			<Container maxWidth="lg">
				<SlideFilter />
			</Container>
		</>
	)
}

export default productPage
