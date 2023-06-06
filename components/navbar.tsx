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
      {tabs.map((tab, i) => 
        <motion.div 
          key={tab.name}
          initial={router.asPath === '/' ? { y: -100 } : false}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: 'spring', delay: 0.6 + (i * 0.1), stiffness: 100 }}
        >
          <Link         
            href={tab.href} 
            className={`${styles.link} ${router.pathname !== tab.href ? styles.unfocus : styles.focus }`} 
            onClick={(e) => (window as any).clickX = e.pageX}
          >
            {router.pathname === tab.href && 
              <motion.div  
                className={styles.pill} 
                layoutId='pill'
                style={{ borderRadius: 9999 }}
                transition={{ type: 'spring', duration: 0.6}}
              />
            }
            <span>{tab.name}</span>
          </Link>
        </motion.div>
      )}
    </nav>
  )
}