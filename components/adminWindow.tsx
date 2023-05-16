import styles from '@/styles/AdminWindow.module.css'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function AdminWindow(
  {src, alt, size, handleClick, id, index, description, setImages}: {src: string, alt: string, size: string, handleClick: any, id: string, index: number, description: string, setImages: any}
  ) {  
  // this is not clean
  const [ desc, setDesc ] = useState(description)
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{display: 'flex', justifyContent: 'center', ...provided.draggableProps.style}}>
          <div className={`border ${styles.container}`}>
            <span className={styles.bar}>
              <img className={`border ${styles.icon}`} src='/close-icon.png' onClick={handleClick}></img>
            </span>
            <div className={styles.content}>
              <img className={styles.image} src={src} alt={alt} />
              <textarea value={desc} className={styles.info} onChange={(e) => {
                setDesc(e.target.value)
                // this works i guess
                setImages((images: any) => {
                  images[index].description = e.target.value
                  return images
                })
              }}></textarea>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}