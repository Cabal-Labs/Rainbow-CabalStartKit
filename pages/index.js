import Head from 'next/head'
import Image from 'next/image'
import Main from '../components/main'
import Navbar from '../components/nav/navbar'
import App from '../components/app'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cabal Labs - RainbowKit Starter</title>
        <meta name="Cabal Labs - RainbowKit Starter" content="Cabal Labs basic implemenation of RainbowKit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App/>   
    </div>
  )
}
