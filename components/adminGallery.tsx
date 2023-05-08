import { useEffect, useState } from 'react'
import styles from '@/styles/AdminGallery.module.css'
import Image from 'next/image'

export default function AdminGallery() {
  const [ images, setImages ] = useState([])

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
  }, [])

  return (
    <>
      <h1>Admin Gallery</h1>
      <div className={styles.container}>
        {images.map((image: any) => {
          return (
            <div key={image._id} className={styles.image}>
              <Image src={image.url} alt={image.alt} fill />
            </div>
          )
        })}
      </div>
    </>
  )
}