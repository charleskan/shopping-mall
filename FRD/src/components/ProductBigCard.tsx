import bigCard from '../styles/ProductBigCard.module.css'
import Image from 'next/image'
import axios from 'axios';

const { register, handleSubmit, formState: { errors },reset } = useForm();
// const onSubmit = data => console.log(data);
// console.log(errors);

function onSubmitForm(values :any){
	let config ={
		method:'post',
		url: `${process.env.NEXT_PUBLIC_ANALYTICS_ID}/product`,
		headers:{
			'Content-Type':'application/json',
		},
		data: values,
	}
	try{
		const res = await axios(config)
		console.log
	}

}

export function ProductBigCard(props: Props) {
	return (
		<div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Product Name" {...register("ProductName", {required: true, maxLength: 80, })} />
      <input type="text" placeholder="description" {...register("description", {required: true, maxLength: 200,})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      {/* <input type="file" placeholder="Mobile number" {...register("Mobile number", {required: true})} /> */}

      <input type="submit" />
    </form>
		</div>
	)
}
