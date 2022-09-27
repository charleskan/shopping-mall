import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { Footer } from '../../components/Footer'
import { Heading } from '../../components/Heading'
import { HeadTitle } from '../../components/HeadTitle'
import { Navbar } from '../../components/Navbar'

import {List} from '../../components/user/pagination'


interface product {
	id: number
	name: string
	icon: string
	description: string
  currentItems: any
  itemsPerPage: any
}


const Pagination: NextPage = () => {

    const [products, setProduct] = useState<product[]>([])



    // async function fetchProduct() {
    //   let res = await fetch(
    //     `${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
    //   )
    //   let product: Array<{id : number,name:string,icon:string,description:string,	currentItems: any, itemsPerPage: any}>= (await res.json()).allProductInfo
    //   setProduct(product)
    //   console.log(product)
    // }
    
    
    // useEffect(() => {
    //   fetchProduct()
    // }, [setProduct])


    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`).then(
            response => response.json().then(data=>{
                setProduct(data)
            })
        )
    })





    return (
        <>
            <HeadTitle />
            <Heading />


            <List itemsPerPage={3} currentItems={null} id={0} name={''} icon={''} description={''}/>


            <Navbar />
            <Footer />
        </>
    )
}

export default Pagination

  
