
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Heading } from '../components/Heading'
import {productInlist} from '../components/PorductInList'


const product: NextPage = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>HIHI</title>
        </Head>
        <Heading />


  
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    )
  }
  
  export default product
  