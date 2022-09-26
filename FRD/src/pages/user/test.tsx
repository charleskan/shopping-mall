import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { Footer } from '../../components/Footer'
import { Heading } from '../../components/Heading'
import { HeadTitle } from '../../components/HeadTitle'
import { Navbar } from '../../components/Navbar'

import {PaginatedItems} from '../../components/user/pagination'




const Pagination: NextPage = () => {



    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];




    return (
        <>
            <HeadTitle />
            <Heading />


            <PaginatedItems itemsPerPage={3} currentItems={null}/>


            <Navbar />
            <Footer />
        </>
    )
}

export default Pagination

  
