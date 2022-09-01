import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import loginStyles from '../styles/Login.module.css'

const Register: NextPage = () => {
  return (
    <div>
      <Heading/>
      <Navbar/>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<div className={loginStyles.loginBox} >
      <form className={loginStyles.loginForm}  action="/send-data-here" method="post">
        <div className={loginStyles.loginWork}>Login</div>
        <div className={loginStyles.loginCommet}>Please login using account detail bellow.</div>
  <input className={loginStyles.textBox} type="text" id="first" placeholder="Username" />
  <input className={loginStyles.textBox} type="text" id="last" placeholder="EmailAddress" />
  <input className={loginStyles.textBox} type="text" id="last" placeholder="Password" />
  <input className={loginStyles.textBox} type="" id="last" placeholder="Icon" />
  <button className={loginStyles.button} type="submit">Sign In</button>
<Link href="/"><p className={loginStyles.loginCommet}>Don't have Account ? Create account</p></Link>
  </form>
  </div>
  <Footer/>
    </div>
    
  )
}

export default Register