import styles from '@/styles/AdminGallery.module.css'
import AdminWindow from './adminWindow'
import { Droppable } from 'react-beautiful-dnd'

export default function AdminGallery({ images, setImages, revalidate }: { images: any, setImages: any, revalidate: any }) {
  return ( 
    <Droppable droppableId='list' direction='vertical'>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.container}>
          {images.map((image: any, index: any) => {
            return (
              <AdminWindow key={image._id} setImages={setImages} description={image.description} id={image._id} index={index} src={image.url} alt={image.alt} handleClick={() => {
                fetch('/api/deleteImage', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ id: image._id }),
                })
                  .then(res => res.json())
                  .then(async (data) => {
                    const filtered = images.filter((i: any) => i._id !== image._id)
                    setImages(filtered)
                    await revalidate()
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

