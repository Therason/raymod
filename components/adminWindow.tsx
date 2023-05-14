import styles from '@/styles/Window.module.css'
import { CSSProperties } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function AdminWindow(
  {src, alt, size, handleClick, id, index}: {src: string, alt: string, size: string, handleClick: any, id: string, index: number}
  ) {
  const style: CSSProperties = { 
    width: size, 
    height: size, 
    minWidth: size, 
    minHeight: size,
  }
  
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className={`border ${styles.container}`} style={style}>
            <span className={styles.bar}>
              <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
            </span>
            <img className={styles.image} src={src} alt={alt} />
          </div>
        </div>
      )}
    </Draggable>
  )
}