import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '@/components/navbar'
import localFont from 'next/font/local'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { useRouter, Router } from 'next/router'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const benderBold = localFont({ src: '../public/Bender_Bold.otf' })
const bender = localFont({ src: '../public/Bender.otf' })

// https://github.com/vercel/next.js/issues/17464#issuecomment-914561683
const routeChange = () => {
  const fix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]')
    allStyleElems.forEach((el) => {
      el.removeAttribute('media')
    })
  }
  fix()
}
Router.events.on('routeChangeComplete', routeChange)
Router.events.on('routeChangeStart', routeChange)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // page components need unique keys for AnimatePresence to work
  const router = useRouter()
  const pageKey = router.asPath

  useEffect(() => {
    router.push(router.pathname)

    const lenis = new Lenis()
    lenis.on('scroll', (e: any) => {
      console.log(e)
    })

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SessionProvider session={session}>
      <Head>
        <title>RAYMOD</title>
        <meta name='description' content='ray portfolio stuffs' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={benderBold.className}>
        <span className={bender.className}>
          <Navbar />
        </span>
        <AnimatePresence mode='wait'>
          <Component
            key={pageKey}
            className={benderBold.className}
            {...pageProps}
          />
        </AnimatePresence>
      </div>
    </SessionProvider>
  )
}
