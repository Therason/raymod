import styles from '@/styles/AdminWindow.module.css'
import { CSSProperties } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function AdminWindow(
  {src, alt, size, handleClick, id, index, description}: {src: string, alt: string, size: string, handleClick: any, id: string, index: number, description: string}
  ) {
  // const style: CSSProperties = { 
  //   width: '350px',
  //   height: size, 
  //   minWidth: '350px', 
  //   minHeight: size,
  // }
  
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style}}>
          <div className={`border ${styles.container}`}>
            <span className={styles.bar}>
              <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
            </span>
            <div className={styles.content}>
              <img className={styles.image} src={src} alt={alt} />
              <textarea value={description} className={styles.info}></textarea>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}