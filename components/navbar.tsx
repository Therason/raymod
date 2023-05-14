import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const {data: session, status} = useSession()
  return (
    <nav className={styles.container}>
      <Link href="/">home</Link>
      <Link href="/gallery">gallery</Link>
      {!session && <Link href="/hush/login">login</Link>}
      {session && <Link href="/admin">admin</Link>}
    </nav>
  )
}