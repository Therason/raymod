import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const bilgres = localFont({ src: '../public/Bilgres.otf' })

// styled components 0.o
const HeaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
`

const Header = styled.div`
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  position: relative;

  h1 {
    font-size: 10vw;
  }
`

const Circle = styled.div`
  position: absolute;
  width: max(120vw, 1000px);
  height: 80vh;
  background: var(--dark-blue);
  border-radius: 50%;
  box-sizing: content-box;
  border: 30vh solid var(--light-blue);
`

const LizardContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0%,-50%);
  width: 50vw;
  height: 45vh;
  z-index: 2;
`

const About = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--offer-white);
  display: grid;
  /* grid-template-columns: 600px 1fr; */
  overflow: hidden;
`

export default function Home() {
  const { scrollYProgress } = useScroll()
  const lizardY = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const logoRotation = useTransform(scrollYProgress, [0, 1], ['rotate(-60deg)', 'rotate(0deg)'])
  const circleScale = useTransform(scrollYProgress, [0,1], [1, 0.5])

  return (
    <>
      <main className={styles.main}>
        <HeaderContainer>
          <Header className={`${bilgres.className}`}>
            <Circle />
            <h1 style={{ zIndex: 3 }}>RAY</h1>
            <LizardContainer>
              <Image alt='lizard lady drawing' src='/lizard.png' fill style={{ objectFit: 'contain' }} priority />
            </LizardContainer>
            <h1 style={{ zIndex: 1 }}>MODULE</h1>
          </Header>
        </HeaderContainer>
        <About>
          <div className={styles.logoContainer}>
            <motion.img 
              className={styles.logoSvg} 
              src='/artist.svg' 
              width='600' height='600' 
              alt='artist and animator' 
              style={{ transform: logoRotation }}
            />
            <Image className={styles.raccoon} alt='raccoon gif' width='300' height='300' src='/selfie.gif' unoptimized />
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </About>
      </main>
    </>
  )
}
