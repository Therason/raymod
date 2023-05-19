import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '@/components/navbar'
import localFont from 'next/font/local'
import { SessionProvider } from 'next-auth/react'

const benderBold = localFont({ src: '../public/Bender_Bold.otf' })
const bender = localFont({ src: '../public/Bender.otf' })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>RAYMOD</title>
        <meta name="description" content="ray portfolio stuffs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={benderBold.className}>
        <span className={bender.className}><Navbar /></span>
        <Component className={benderBold.className} {...pageProps} />
      </main>
    </SessionProvider>
  )
}
