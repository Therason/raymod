import styles from '@/styles/Window.module.css'
import { useSortable } from '@dnd-kit/sortable'

export default function Window({src, alt, size, handleClick, id}: {src: string, alt: string, size: string, handleClick: any, id: string}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id })
  const style: any = { width: size, height: size, minWidth: size, minHeight: size}
  if (transform) style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0)`
  if (transition) style.transition = transition

  
  return (
    <div id={id} className={`border ${styles.container}`} style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <span className={styles.bar}>
        <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
      </span>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  )
}