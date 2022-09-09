import bigCard from '../styles/ProductBigCard.module.css'
import Image from 'next/image'

interface Props {
	name: string
	image: string
    specialPrice :number
	price: number
}

export function ProductBigCard(props: Props) {
	return (
		<div className={bigCard.cardBigBox}>
			<Image
				className={bigCard.s}
				src={props.image}
				width={200}
				height={180}
			/>

			<div className={bigCard.cardBox}>
				<div className={bigCard.productName}>{props.name}</div>

				<div>
					<div className={bigCard.specialPrice}>{props.specialPrice}</div>
					<div className={bigCard.price}>{props.price}</div>
				</div>
			</div>
		</div>
	)
}
