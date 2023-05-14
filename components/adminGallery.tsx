import { useEffect, useState } from 'react'
import styles from '@/styles/AdminGallery.module.css'
import AdminWindow from './adminWindow'
import { Droppable } from 'react-beautiful-dnd'

export default function AdminGallery({ images, setImages }: { images: any, setImages: any }) {


  return ( 
    // <div className={styles.container}>
    <Droppable droppableId='list'>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {images.map((image: any, index: any) => {
            return (
              <AdminWindow key={image._id} id={image._id} index={index} src={image.url} alt={image.alt} size="250px" handleClick={() => {
                fetch('/api/deleteImage', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ id: image._id }),
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log(data)
                    const filtered = images.filter((i: any) => i._id !== image._id)
                    setImages(filtered)
                  })
                  .catch(e => console.error(e))
              }}/>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

