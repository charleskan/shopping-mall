import cart from '../styles/Cart.module.css'
import Image from 'next/image'
// interface Props {
// 	product: string
// 	icon: string
// 	color: string
// 	size: string
// 	tc_price: number
// 	tc_number: string
// }

function SubmitTotal() {
	return (

			<div className={cart.totalBox} >
                <div >
                    <div>Total</div>
                    <div>$</div>

                </div>
                <button>Proceed To Checkout</button>

			</div>
	
	)
}

export default SubmitTotal
