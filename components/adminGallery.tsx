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


export default function AdminGallery({ images, setImages }: { images: any, setImages: any }) {
  // rendered images
  // const [ images, setImages ] = useState<any>([])
  // useEffect(() => {
  //   fetch('/api/images')
  //     .then(res => res.json())
  //     .then(data => setImages(data.images))
  // }, [])

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
      setImages((images: any) => {
        // const oldIndex = images.indexOf(active.id)
        // const newIndex = images.indexOf(over.id)
        let oldIndex = 0
        let newIndex = 0

        for (let i = 0; i < images.length; i++) {
          if (images[i].id === active.id) oldIndex = i
          if (images[i].id === over.id) newIndex = i
        }

        return arrayMove(images, oldIndex, newIndex)
      })
    }
  }

  return ( 
    // <div className={styles.container}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map((image: any, index: any) => {
            return (
              <Window id={index} key={image._id} src={image.url} alt={image.alt} size="250px" handleClick={() => {
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
    // </div>
  )
}

