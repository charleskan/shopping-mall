import card from '../styles/ProductCard.module.css'
import Image from 'next/image'


interface Props {
	id: number
	name: string
	image1: string
}

export function ProductCard(props: Props) {
		
	return (
		<div className={card.cardBigBox}>
			<Image
				className={card.s}
				src={`/${props.image1}`}
				width={200}
				height={250}
			/>

			<div className={card.productName}>{props.name}</div>
		</div>
	)
}
