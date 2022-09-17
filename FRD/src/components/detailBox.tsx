import Image from 'next/image'
import img from '../pages/photo/AboutUs.png'
import detail from '../styles/detailBox.module.css'

interface Props {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	price: any
}

export function DetailBox(props: Props) {
	return (
		<div className={detail.box}>
         <div className={detail.box}>
			<div className={detail.imageBox}>
				<Image src={img} width={100} height={100} />
				<Image src={img} width={100} height={100} />
				<Image src={img} width={100} height={100} />
			</div>
			<div>
				<Image src={img} width={200} height={200} />
			</div>
			<div>
				<div>{props.name}</div>
				<div>{props.price}</div>
				<form action='/send-data-here' method='post'>
					{<input type='radio'></input>}
					{<input type='radio'></input>}
					<button type='submit'>Add To Cart</button>
				</form>
			</div>
		</div>
      </div>
	)
}
