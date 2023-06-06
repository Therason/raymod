import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'
import { motion, useScroll, useTransform } from 'framer-motion'

const bilgres = localFont({ src: '../public/Bilgres.otf' })

export default function Home() {
  const { scrollYProgress } = useScroll()
  const lizardY = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const logoRotation = useTransform(scrollYProgress, [0, 1], ['rotate(-60deg)', 'rotate(0deg)'])
  const circleScale = useTransform(scrollYProgress, [0,1], [1, 0.5])

  return (
    <>
      <main className={styles.main}>
        <motion.div className={styles.header_container} transition={{ duration: 0 }}>
          <div className={`${bilgres.className} ${styles.header}`}>
            <motion.div 
              className={styles.circle} 
              style={{ scale: circleScale }} 
              initial={{ scale: 2 }}
              animate={{ 
                scale: 1,
                transition: { duration: 0.6, delay: 0.6, type: 'spring' }
              }}
            />
            <motion.h1 
              style={{ zIndex: 3 }} 
              initial={{ x: '-65vw'}} 
              animate={{ x: 0 }}
              exit={{ x: '-65vw' }}
              transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
            >
              RAY
            </motion.h1>
            <motion.div 
              className={styles.lizard_container} 
              style={{ y: lizardY }} 
              initial={{ y: '-100vh'}}
              animate={{ y: '-50%' }}
              key='lizard-container-div'
            >
              <Image alt='lizard lady drawing' src='/lizard.png' fill style={{ objectFit: 'contain' }} priority />
              </motion.div>
            <motion.h1 
              style={{ zIndex: 1 }}
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              transition={{ duration: 1, delay: 0.45, type: 'spring' }}
            >
              MODULE
            </motion.h1>
          </div>
        </motion.div>
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
