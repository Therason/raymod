import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <span className={styles.bar}></span>
        <span className={styles.artsy}></span>
        <h1 className={styles.header}>RAY.MODULE</h1>
        <h2 className={styles.subheader}>artist//animator</h2>
        <div className={styles.links}>
          <Link href="/admin">admin stuff</Link>
          <Link href="/gallery">gallery</Link>
          <Link href="/about">about</Link>
        </div>
      </main>
    </>
  )
}
