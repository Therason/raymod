import styles from '@/styles/Window.module.css'
import { CSSProperties } from 'react'

export default function Window(
  {src, alt, size, handleClick, id}: {src: string, alt: string, size: string, handleClick: any, id: string}
  ) {
  const style: CSSProperties = { 
    width: size, 
    height: size, 
    minWidth: size, 
    minHeight: size,
  }
  
  return (
    <div className={`border ${styles.container}`} style={style}>
      <span className={styles.bar}>
        <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
      </span>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  )
}