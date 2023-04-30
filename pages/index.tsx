import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1>RAYMOD!!!</h1>
        <Link href="/upload">admin stuff</Link>
      </main>
    </>
  )
}
