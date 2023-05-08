import styles from '@/styles/BigWindow.module.css'

export default function BigWindow({image}: {image: any}) {
  return (
    <div className={`border ${styles.container}`}>
      <img className={styles.image} src={image.url} alt={image.alt || ''} />
    </div>
  )
}