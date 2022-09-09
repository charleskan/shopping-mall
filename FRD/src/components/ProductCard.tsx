import Link from 'next/link'
import card from '../styles/ProductCard.module.css'
import Image from 'next/image'


interface Props {
	name: string
	image: string
	color: string
	code: string
	price: number
}

export function ProductCard(props: Props) {
	return (
		<div className={card.cardBigBox}>
                        <Image className={card.s}  src={props.image}
                  width={200}
                  height={180}
            />

			<div className={card.cardBox} >

				<div className={card.productName}>{props.name}</div>
                <div className={card.colorBox}>
				<div className={card.color}>{props.color}</div>
				<div className={card.color}>{props.color}</div>
				<div className={card.color}>{props.color}</div>
                </div>
				<div className={card.code}>{props.code}</div>
				<div className={card.price}>{props.price}</div>
			</div>
		</div>
	)
}
