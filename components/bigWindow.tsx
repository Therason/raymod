import styles from '@/styles/BigWindow.module.css'
import Image from 'next/image'
import CloseIcon from './closeIcon'

export default function BigWindow({image}: {image: any}) {
  return (
    <div className={`border ${styles.container}`}>
      <span className={styles.bar}>
        <CloseIcon handleClick={() => {}} background='#eddcd1' />
      </span>
      <div className={styles.content}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src={image.url} alt={image.alt || ''} className={styles.image} fill style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.info}>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  )
}