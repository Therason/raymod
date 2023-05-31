import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'
import { motion, useScroll, useTransform } from 'framer-motion'

const bilgres = localFont({ src: '../public/Bilgres.otf' })

export default function Home() {
  const { scrollYProgress } = useScroll()
  const lizardY = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const logoRotation = useTransform(scrollYProgress, [0, 1], ['rotate(-60deg)', 'rotate(0deg)'])

  return (
    <>
      <main className={styles.main}>
        <div className={styles.header_container}>
          <div className={`${bilgres.className} ${styles.header}`}>
            <h1 style={{ zIndex: 3 }}>RAY</h1>
            <motion.div className={styles.lizard_container} style={{ y: lizardY }}>
              <Image alt='lizard lady drawing' src='/lizard.png' fill style={{ objectFit: 'contain' }} priority />
            </motion.div>
            <h1 style={{ zIndex: 1 }}>MODULE</h1>
          </div>
        </div>
        <div className={styles.about}>
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
        </div>
      </main>
    </>
  )
}
