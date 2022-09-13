import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import loginStyles from '../styles/Login.module.css'

const Register: NextPage = () => {
	const { handleSubmit, register } = useForm()
	const [error, setError] = useState('')
	const router = useRouter()


	return (
		<div>
			<Heading />
			<Navbar />
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={loginStyles.loginBox}>
				<form
					className={loginStyles.loginForm}
					action='/send-data-here'
					method='post'
					onSubmit={handleSubmit(async (data) => {
						const formObject :any={}
						formObject['username']= data.username
						formObject['password']=data.password
						formObject['email']=data.email
						formObject['nickName']=data.nickName

						const res = await fetch(
							
							`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/register`,
							{
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								credentials: 'include',
								body: JSON.stringify(formObject)
							}
						)
						if (res.status === 200) {
							router.push('/login')
						} else if (res.status === 400) {
							setError('Password Error')
						} else if (res.status === 500) {
							setError('打錯呀')
						}
					})}>
					{error}
					<div className={loginStyles.loginWork}>Register</div>
					<div className={loginStyles.loginCommet}>
						Create your Account
					</div>
					<input
						{...register('username')}
						className={loginStyles.textBox}
						type='text'
						id='name'
						placeholder='Username'
					/>
					<input
						{...register('password')}
						className={loginStyles.textBox}
						type='text'
						id='Password'
						placeholder='Password'
					/>
					<input
						{...register('email')}
						className={loginStyles.textBox}
						type='text'
						id='email'
						placeholder='EmailAddress'
					/>
					<input
						{...register('nickName')}
						className={loginStyles.textBox}
						type='text'
						id='nickName'
						placeholder='Nickname'
					/>
					<button className={loginStyles.button} type='submit'>
						Register
					</button>
					<Link href='/login'>
						<p className={loginStyles.regiseterCommet}>
							Have Account ? Sign in account
						</p>
					</Link>
				</form>
			</div>
			<Footer />
		</div>
	)
}

export default Register
