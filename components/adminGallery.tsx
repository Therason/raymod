import { useEffect, useState } from 'react'
import styles from '@/styles/AdminGallery.module.css'
import Window from './window'
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent
} from '@dnd-kit/core'
import { 
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'


export default function AdminGallery() {
  // rendered images
  const [ images, setImages ] = useState([])
  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
  }, [])

  // setup droppable area
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const {active, over} = e
    if (over && active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.indexOf(active.id)
        const newIndex = images.indexOf(over.id)

        return arrayMove(images, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <h2>Admin Gallery</h2>
      
      <div className={styles.container}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images} strategy={verticalListSortingStrategy}>
            {images.map((image: any, index) => {
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
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}

