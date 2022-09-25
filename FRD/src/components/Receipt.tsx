import Image from 'next/image'
import img from '../pages/photo/AboutUs.png'
import invoice from '../styles/Invoice.module.css'

interface Props {
	id: number
	invoiceNumber: string
	status_id: number
	user_id: number
	address_id: number
	totalPrice: number
}

export function Invoice(props: Props) {
	return(
	<div>
		<div>
			<div>My orders</div>
			<div>{props.id}</div>
			<div>Order Number :{props.invoiceNumber}</div>
			<div>Status:{props.status_id}</div>
			<div> Name:{props.user_id}</div>
			<div>Address:{props.address_id}</div>
			<div>TotolPrice{props.totalPrice}</div>
		</div>
	</div>
    )
}
