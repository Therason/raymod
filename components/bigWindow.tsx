import styles from '@/styles/BigWindow.module.css'

export default function BigWindow({image}: {image: any}) {
  return (
    <div className={`border ${styles.container}`}>
      <span className={styles.bar}>
        <img className={`border ${styles.icon}`} src='/close-icon.png'></img>
      </span>
      <div className={styles.content}>
        <img className={styles.image} src={image.url} alt={image.alt || ''} />
        <div className={styles.info}>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  )
}