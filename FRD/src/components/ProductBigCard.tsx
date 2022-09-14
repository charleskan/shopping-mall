import bigCard from '../styles/ProductBigCard.module.css'
import Image from 'next/image'

interface Props{
	id:number,
	name: string
	image1: string
}

export function ProductBigCard(props: Props) {
	return (
		<div className={bigCard.cardBigBox}>
			<Image
				className={bigCard.s}
				src={`/${props.image1}`} 
				width={400}
				height={100}
			/>

			<div className={bigCard.cardBox}>
				<div className={bigCard.productName}>{props.name}</div>

			</div>
		</div>
	)
}
