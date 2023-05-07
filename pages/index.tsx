import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        {/* <span className={styles.bar}>menu</span> */}
        <span className={styles.artsy}></span>
        <div className={styles.headers}>
          <h1 className={styles.header}>RAY.MODULE</h1>
          <h2 className={styles.subheader}>artist//animator</h2>
        </div>

        <div className={styles.content}>
          <Image src='/selfie.gif' width={500} height={440} alt='raccoon selfie'/>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div className={styles.links}>
          <Link href="/admin">admin stuff</Link>
          <Link href="/gallery">gallery</Link>
          <Link href="/about">about</Link>
        </div>
      </main>
    </>
  )
}
