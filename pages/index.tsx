import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1>RAYMOD!!!</h1>
        <Link href="/admin">admin stuff</Link>
        <Link href="/gallery">gallery</Link>
        <Link href="/about">about</Link>
      </main>
    </>
  )
}
