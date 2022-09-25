import { NextPage } from 'next'
import { Navbar } from '../../components/Navbar'
import { HeadTitle } from '../../components/HeadTitle'
import { Heading } from '../../components/Heading'
import { Footer } from '../../components/Footer'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EditUserProfileForm from '../../components/EditUserProfileForm'

interface User {
	username: string
	password: string
	email: string
	icon: string
	nickname: string
}



const userInformation: NextPage = () => {
	const [userInfos, setUserInfos] = useState<User[]>([])

	async function fetchUser() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userinfo`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)

        const user = await res.json()

		const userinfo = user.userInfo

        // const userAddressInfo = user.addressInfo.rows

		setUserInfos(userinfo)
		console.log(userinfo[0])
        // console.log(userAddressInfo);
        
        
	}

	useEffect(() => {
		fetchUser()
	}, [setUserInfos])

	const { handleSubmit, register } = useForm()

    // const header = {
    //     headers: new HttpHeaders()
    //       .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    //   }

	return (
		<>
        
			<HeadTitle />
			<Heading />
			<Navbar />

			{/* <button onClick={() => {fetchUser()}}>click</button> */}


			<form
				onSubmit={handleSubmit(async (data) => {

					const formData = new FormData()
					formData.append('username', data.username)
					formData.append('password', data.password)
					formData.append('email', data.email)
					formData.append('icon', data.icon[0])
					formData.append('nickname', data.nickname)

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userinfo`,
						{
							method: 'PUT',
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									'token'
								)}`
							},
							body: formData
						}
					)
					const result = await res.json()
					console.log(result)
				})}>

                <EditUserProfileForm/>


                
                <input 
					type='submit'
					value='Submit'></input >
                </form>
			<Footer />
		</>
	)
}

export default userInformation
