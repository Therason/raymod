import styles from '@/styles/Window.module.css'

export default function Window({src, alt, size}: {src: string, alt: string, size: string}) {
  return (
    <div className={`border ${styles.container}`} style={{ minWidth: size, minHeight: size}}>
      <span className={styles.bar}>
        <img className={`border ${styles.icon}`} src='/close-icon.png'></img>
      </span>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  )
}