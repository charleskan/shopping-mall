import card from '../styles/ProductCard.module.css'
// import Image from 'next/image'
interface Props {
  product: string,
  icon: string,
  color: string,
  size: string,
  tc_price: number,
  tc_number: string,

}

function CartItem(props: Props) 
{
  return (
            <div>
							<div className={card.asd}>{props.product}</div>
							{props.icon}
							{props.color}
							{props.size}
							{props.tc_number}
							{props.tc_price}
						</div>
    )}

export default CartItem;