import cart from '../styles/Cart.module.css'
import Image from 'next/image'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { useAppDispatch } from '../store'
import Link from 'next/link'

import { withRouter, NextRouter } from 'next/router'
import React from 'react'


interface Props {
	onMinusFromCart: () => void;
	onRemoveFromCart: () => void;
	onAddToCart: () => void;
	product: string
	icon: string
	color: string
	size: string
	tc_price: number
	tc_number: string
	// router: NextRouter
}

export default function CartItem(props: Props) {


	
	return (
		<div className={cart.cartBox}>
			<Image
				src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
				width={100}
				height={100}
			/>
			<div className={cart.icon}>{props.product}</div>
			<div className={cart.icon}> {props.color}</div>
			<div className={cart.icon}> {props.size}</div>
			<div className={cart.icon}>
			<button className={cart.button}>
				<RemoveCircleIcon onClick={props.onMinusFromCart} />
			</button>
			<div className={cart.icon}> {props.tc_number}</div>
			<button className={cart.button}>
				<AddCircleIcon onClick={props.onAddToCart}/>
			</button>
			</div>
			<div className={cart.icon}>${props.tc_price}</div>
			<button className={cart.button}>
				<CancelIcon onClick={props.onRemoveFromCart}/>
			</button>
		</div>
	)	
}


// class CartItem extends React.Component<Props> {
// 	render() {		
// 	<div className={cart.cartBox}>
// 	<Image
// 		src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${this.props.icon}`}
// 		width={100}
// 		height={100}
// 	/>
// 	<div className={cart.icon}>{this.props.product}</div>
// 	<div className={cart.icon}> {this.props.color}</div>
// 	<div className={cart.icon}> {this.props.size}</div>
// 	<button className={cart.button}>
// 		<RemoveCircleIcon />
// 	</button>
// 	<div className={cart.icon}> {this.props.tc_number}</div>
// 	<button className={cart.button}>
// 		<AddCircleIcon />
// 	</button>
// 	<div className={cart.icon}>${this.props.tc_price}</div>
// 	<button className={cart.button}>
// 		<CancelIcon onClick={this.props.onRemoveFromCart} />
// 	</button>
// </div>
// 	  return <p>{this.props.router.pathname}</p>
// 	}
//   }

// export default withRouter(CartItem)
