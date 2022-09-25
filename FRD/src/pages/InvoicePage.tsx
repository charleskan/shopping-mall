import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import error from '../styles/Invoice.module.css'
import Link from 'next/link'
import errorPhoto from '../pages/photo/error.png'
import { Footer } from '../components/Footer'
import errorImage from './error.png'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import {Invoice} from '../components/Receipt'

interface Props{
    id:number
    invoiceNumber:string
    status_id:number
    user_id:number
    address_id:number
    totalPrice:number

}





const InvoicePage: NextPage = () => {

    const [invoice, setInvoice] = useState< Props[]>([])

	async function fetchInvocie() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/Invoice`,
   )
		
		let invocie = (await res.json()).productDetailByproductId
		setInvoice(invocie)
	}{}

	useEffect(()=>{
		fetchInvocie()
	},[setInvoice])

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
            {invoice.map((invocies) => (
			<Invoice
				id={invocies.id}
				invoiceNumber={invocies.invoiceNumber}
				status_id={invocies.status_id}
				user_id={invocies.user_id}
				address_id={invocies.address_id}
				totalPrice={invocies.totalPrice}
		
			/>
			))}



			<Footer />
		</div>
	)
}

export default InvoicePage