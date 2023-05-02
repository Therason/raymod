import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  return (
    <span className={styles.container}>
      <Link href="/">Home</Link>
      <Link href="/gallery">Gallery</Link>
    </span>
  )
}