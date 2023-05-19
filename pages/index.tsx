import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'

const bilgres = localFont({ src: '../public/Bilgres.otf' })

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.header_container}>
          <div className={`${bilgres.className} ${styles.header}`}>
            <h1 style={{ zIndex: 3 }}>RAY</h1>
            <div className={styles.lizard_container}>
              <Image alt='lizard lady drawing' src='/lizard.png' fill style={{ objectFit: 'contain' }} />
            </div>
            <h1 style={{ zIndex: 1 }}>MODULE</h1>
          </div>
        </div>
      </main>
    </>
  )
}
