import Image from 'next/image'
import styles from '@/styles/CloseIcon.module.css'

export default function CloseIcon({ handleClick, background }: { handleClick: any, background: string }) {
  return (
    <Image 
      src='/close-icon.png' 
      alt='close button' 
      className={`border ${styles.icon}`} 
      onClick={handleClick} 
      width={7} height={7}
      style={{ background }}
    />
  )
}