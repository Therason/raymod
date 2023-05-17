import styles from '@/styles/Window.module.css'
import { CSSProperties } from 'react'
import Image from 'next/image'
import CloseIcon from './closeIcon'

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
        <CloseIcon background='#c6c6c6' handleClick={handleClick} />
      </span>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }}/>
      </div>
    </div>
  )
}