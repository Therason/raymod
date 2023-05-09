import { useEffect, useState } from 'react'
import styles from '@/styles/AdminGallery.module.css'
import Window from './window'
import { useDroppable } from '@dnd-kit/core'

export default function AdminGallery() {
  // rendered images
  const [ images, setImages ] = useState([])
  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
  }, [])

  // setup droppable area
  const { isOver, setNodeRef } = useDroppable({ id: 'droppable' })

  return (
    <>
      <h2>Admin Gallery</h2>
      <div className={styles.container} ref={setNodeRef}>
        {images.map((image: any) => {
          return (
            <Window id={image._id} key={image._id} src={image.url} alt={image.alt} size="250px" handleClick={() => {
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
      </div>
    </>
  )
}