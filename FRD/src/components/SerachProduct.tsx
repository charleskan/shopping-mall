import Image from 'next/image'
import serach from '../styles/detailBox.module.css'

interface Props {
	id: number
	name: string
	icon: string
	description: string
}

interface keyword {
	id: number
	name: string
	icon: string
	color: string
    size: string
    price: number
    stock: number

}


export function SearchProductInfo(props: Props) {
	return (
		<div className={serach.serachDiv}>
			<div className={serach.productId}>Product ID:{props.id}</div>
			<div>
				<Image
					src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`} 
					width={150}
					height={150}
				/>
			</div>
			<div className={serach.productName}>{props.name}</div>
			<div className={serach.productDescription}>{props.description}</div>
		</div>
	)
}


export  function SearchProductDetail(props: keyword) {
	return (
		<div>
			<div>{props.id}</div>
			<div>
				<Image
					src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`} 
					width={150}
					height={150}
				/>
			</div>
			<div>{props.name}</div>
			<div>{props.color}</div>
			<div>{props.size}</div>
			<div>{props.price}</div>
			<div>{props.stock}</div>
		</div>
	)
}