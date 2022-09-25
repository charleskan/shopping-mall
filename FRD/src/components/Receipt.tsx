import Image from 'next/image'
import img from '../pages/photo/AboutUs.png'
import invoice from '../styles/Invoice.module.css'

interface Props {
	id:number
    invoiceNumber:string
    status_id:string
    user_id:string
    address_id:string
    totalPrice:number
    product:string
    icon: string
    color:string
    size:string
    number:number
}

export function Invoice(props: Props) {
	return(
	<div className={invoice.box}>
		
		<div className={invoice.invoiceDiv}>
		<div className={invoice.order}>My orders</div>
			<div>
			<div>{props.id}</div>
			<div>Order Number :{props.invoiceNumber}</div>
			<div>Status:{props.status_id}</div>
			<div> Name:{props.user_id}</div>
			<div>Address:{props.address_id}</div>
			<div>TotolPrice{props.totalPrice}</div>
			<div>Product{props.product}</div>
			<div>TotolPrice{props.color}</div>
			<div>TotolPrice{props.size}</div>
			<div>Number{props.number}</div>
			</div>
		</div>
	</div>
    )
}
