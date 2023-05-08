import styles from '@/styles/Window.module.css'

export default function Window({src, alt, size, handleClick}: {src: string, alt: string, size: string, handleClick: any}) {
  return (
    <div className={`border ${styles.container}`} style={{ width: size, height: size, minWidth: size, minHeight: size}}>
      <span className={styles.bar}>
        <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
      </span>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  )
}