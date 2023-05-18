import styles from '@/styles/AdminWindow.module.css'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CloseIcon from './closeIcon'
import Image from 'next/image'

export default function AdminWindow(
  {src, alt, handleClick, id, index, description, setImages}: {src: string, alt: string, handleClick: any, id: string, index: number, description: string, setImages: any}
  ) {  
  // this is not clean
  const [ desc, setDesc ] = useState(description)
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{display: 'flex', justifyContent: 'center', ...provided.draggableProps.style}}>
          <div className={`border ${styles.container}`}>
            <span className={styles.bar}>
              <CloseIcon handleClick={handleClick} background='#eddcd1' />
            </span>
            <div className={styles.content}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image src={src} alt={alt || ''} fill style={{ objectFit: 'contain' }} />
              </div>
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