import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import create from '../styles/CreateProduct.module.css'
// import { useSelector } from 'react-redux';

// import { RootState } from './store';

export function AddColumn() {
	const { handleSubmit, register } = useForm()

	return (
		<div>
			<form 
			className={create.addProductDiv}
				onSubmit={handleSubmit(async (data) => {
					// console.log(data)
					console.log(data.image1[0])

					const formData = new FormData()

					formData.append('product_id', data.product_id)
					formData.append('color_id', data.color_id)
					formData.append('size_id', data.size_id)
					formData.append('price', data.price)
					formData.append('stock', data.stock)
				

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/`,
						{
							method: 'POST',
							credentials: 'include',
							body: formData
						}
					)
					if (res.status === 200) {
					}
				})}>
					<div className={create.title}>Add the Color And Size</div>
				<input className={create.input} type="text"   placeholder='Product ID'{...register('product_id', { required: true })}></input>
				<input className={create.input} type="text"   placeholder='Color'  {...register('color_id', { required: true })}></input>
				<input
					className={create.input} type="text"   placeholder='Size'
					{...register('size_id', { required: true })}></input>
				<input className={create.input} type="text"   placeholder='Price' {...register('price', { required: true })}></input>
				<input className={create.input} type="text"   placeholder='Stock' {...register('stock', { required: true })}></input>


			
				<input 		className={create.input} type='submit' value='Submit'></input>
			</form>
		</div>
	)
}
