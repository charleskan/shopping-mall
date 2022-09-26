import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { Footer } from '../../components/Footer'
import { Heading } from '../../components/Heading'
import { HeadTitle } from '../../components/HeadTitle'
import { Navbar } from '../../components/Navbar'

import {PaginatedItems} from '../../components/user/pagination'

interface currentItems {
	id: number
	name: string
	icon: string
	description: string
}


const Pagination: NextPage = () => {


    // const [products, setProduct] = useState<product[]>([])

	// async function fetchProduct() {
	// 	let res = await fetch(
	// 		`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
	// 	)
	// 	let product = (await res.json()).allProductInfo
	// 	setProduct(product)
	// 	console.log(product)
	// }


    // useEffect(() => {
	// 	fetchProduct()
	// }, [setProduct])







    return (
        <>
            <HeadTitle />
            <Heading />


            <PaginatedItems itemsPerPage={20} currentItems={null}/>


            <Navbar />
            <Footer />
        </>
    )
}

export default Pagination

  
