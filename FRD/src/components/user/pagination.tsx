import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import product from '../styles/Product.module.css'

interface Props {
	currentItems: any
	itemsPerPage: any
}

interface currentItems {
		id: number
		name: string
		description: string
		icon: string
		image1: string
		image2: string
		image3: string
		status_id: number
    brand_id: number
    created_at: string
    updated_at: string
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]



function Items({ currentItems }: Props) {
	return (
		<>
			{currentItems &&
				currentItems.map((item: any) => (
					<div>
						<h3>Item #{item}</h3>
					</div>
				))}
		</>
	)
}

export function PaginatedItems({ itemsPerPage }: Props) {
	const [items, setItems] = useState<currentItems[]>([])

	async function fetchProduct() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
		)
		let product = (await res.json()).allProductInfo
		setItems(product)
    // console.log(product)
		// console.log(items)
	}

	useEffect(() => {
		fetchProduct()
	}, [setItems])

	// const items: Array<{
	// 	id: number
	// 	name: string
	// 	description: string
	// 	icon: string
	// 	image1: string
	// 	image2: string
	// 	image3: string
	// 	status_id: number
  //   brand_id: number
  //   created_at: string
  //   updated_at: string
	// }> = 

	// const items:Array<String> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

	const [currentItems, setCurrentItems] = useState<currentItems[]>([])

	const [pageCount, setPageCount] = useState(0)

	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage
		console.log(`Loading items from ${itemOffset} to ${endOffset}`)
		let item: Array<{
      id: number
      name: string
      description: string
      icon: string
      image1: string
      image2: string
      image3: string
      status_id: number
      brand_id: number
      created_at: string
      updated_at: string
    }> = items.slice(itemOffset, endOffset)

    console.log(item)

		setCurrentItems(item)
   
    
		setPageCount(Math.ceil(items.length / itemsPerPage))
	}, [itemOffset, itemsPerPage])

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items.length
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		)
		setItemOffset(newOffset)
	}

  

	return (
		<>
			<Items currentItems={currentItems} itemsPerPage={null} />
			<ReactPaginate 
				breakLabel='...'
				nextLabel='next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel='< previous'
				//   renderOnZeroPageCount={null}
			/>
		</>
	)
}
