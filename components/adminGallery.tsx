import { useEffect, useState } from 'react'
import styles from '@/styles/AdminGallery.module.css'
import Image from 'next/image'
import Window from './window'

export default function AdminGallery() {
  const [ images, setImages ] = useState([])

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
  }, [])

  return (
    <>
      <h2>Admin Gallery</h2>
      <div className={styles.container}>
        {images.map((image: any) => {
          return (
            // <div key={image._id} className={styles.image}>
            //   <Image src={image.url} alt={image.alt} fill />
            // </div>
            <Window key={image._id} src={image.url} alt={image.alt} size="250px" handleClick={() => {
              console.log('ID:', image._id)
            }}/>
          )
        })}
      </div>
    </>
  )
}