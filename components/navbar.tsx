import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  return (
    <span className={styles.container}>
      <Link href="/">home</Link>
      <Link href="/gallery">gallery</Link>
      <Link href="/admin">admin</Link>
    </span>
  )
}