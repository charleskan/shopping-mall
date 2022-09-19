import card from '../styles/ProductCard.module.css'
// import Image from 'next/image'

interface Props {
    tc_price: string,
    productDetail_id: number,
    invoice_id: number,
    tc_number: string,
    id: number,
    product_id: number,
    color_id: number,
    size_id: number,
    price: number,
    stock: number,
    status_id: number,
    created_at: string,
    updated_at: string,
}

function cartItem(props: Props) 
{
  return (

    <li className={card.cardBigBox}>
      
        <div className={card.cardBigBox}>
          <h3>{props.id}</h3>
        </div>
        
    </li>
    )}

export default cartItem;