import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import { Footer } from '../components/Footer'
import { DetailBox2 } from '../components/detailBox2'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


interface Invoice {
		id: number,
		invoiceNumber: string,
        user_id: number,
		status_id: number,
		address_id: number,
		totalPrice: number,
		updated_at: string,
	}


const ProductDetails: NextPage = () => {
	
	
	const [invoiceDetails, setInvoiceDetail] = useState<Invoice []>([])

	async function fetchInvoice() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/invoice/`
		)
		let invoiceDetails = (await res.json()).invoiceRecord
		setInvoiceDetail(invoiceDetails)
	}{}

	useEffect(()=>{
		fetchInvoice()
	},[setInvoiceDetail])



	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			{invoiceDetails.map((invoiceDetail) => (
			<DetailBox2
				key={invoiceDetail.id}
				invoiceNumber={invoiceDetail.name}
				username={invoiceDetail.user_id}
				image1={product.image1}
				image2={product.image2}
				image3={product.image3}
				Brand={product.Brand}
			/>
			))}

			<Footer />
		</>
	)
}

export default ProductDetails
