import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [ tabs, setTabs ] = useState([
    {name: 'home', href: '/'},
    {name: 'gallery', href: '/gallery'},
    {name: 'contact', href: '/contact'},
  ])
  const {data: session} = useSession()

  useEffect(() => {
    if (session && tabs[tabs.length - 1].name !== 'admin') {
      setTabs([
        ...tabs,
        {name: 'admin', href: '/admin'}
      ])
    }
    // :^)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const router = useRouter()

  return (
    <nav className={styles.container}>
      {tabs.map((tab) => 
        <Link key={tab.name} href={tab.href} className={`${styles.link} ${router.pathname !== tab.href ? styles.unfocus : styles.focus }`}>
          {router.pathname === tab.href && 
            <motion.div className={styles.pill} layoutId='pill' />
          }
          <span>{tab.name}</span>
        </Link>
      )}
      {/* {!session && <Link href="/hush/login">login</Link>} */}
    </nav>
  )
}