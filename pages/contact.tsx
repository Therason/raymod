import styles from '@/styles/Contact.module.css'
import { useMotionValue, useTransform, motion, easeInOut } from 'framer-motion'
import { useState, useEffect } from 'react'

// need a hook to detect the window width
function useWindowWidth() {
  const [ width, setWidth ] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    setWidth(window.innerWidth)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

// hook to track mouseX
function useMouseX() {
  const x = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.pageX)
    }

    document.addEventListener('mousemove', handleMouseMove)
    // uhh...
    x.set((window as any).clickX || 0)
    return () => window.removeEventListener('mousemove', handleMouseMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return x
}

export default function Contact() {
  const x = useMouseX()
  const windowWidth = useWindowWidth()
  const rotateY = useTransform(x, [0, windowWidth], [-15, 15], {clamp: false, ease: easeInOut})

  const transition = {
    duration: 0.8,
    type: 'spring'
  }

  return (
    <main className={styles.main}>
      <motion.div 
        className={styles.linksContainer} style={{ rotateY }}>
        <motion.a 
          href='https://twitter.com/bbgj_' 
          className={`${styles.logo} ${styles.twitter}`}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={transition}
        >
          <svg viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
          <span>twitter</span>
        </motion.a>
        <motion.a 
          href='https://raymodule.tumblr.com/' 
          className={`${styles.logo} ${styles.tumblr}`}
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={transition}
        >
          <svg viewBox="0 0 320 512"><path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"/></svg>
          <span>tumblr</span>
        </motion.a>
        <motion.a 
          href='mailto:placeholder@email.com' 
          className={`${styles.logo} ${styles.email}`}
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={transition}
        >
          <svg viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
          <span>email?</span>
        </motion.a>
      </motion.div>
    </main>
  )
}