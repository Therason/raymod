import styles from '@/styles/AdminUpload.module.css'
import { useState } from 'react'
import Image from 'next/image'

export default function AdminUpload(
  { revalidate, image, setImage, uploaded, setUploaded }: 
  { revalidate: any, image: File | undefined, setImage: any, uploaded: boolean, setUploaded: any }
) {
  const [ description, setDescription ] = useState('')
  const [ alt, setAlt ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('image', image as Blob)
    form.append('description', description)
    form.append('alt', alt)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })
    const data = await res.json()

    // revalidate
    await revalidate()

    // reset state
    setUploaded(true)
    setDescription('')
    setAlt('')
  }

  return (
    <div className={styles.upload}>
      <div className={styles.form}>
        <h3>select image</h3>
        <input type="file" accept="image/*" onChange={(e) => {
          const selectedFiles = e.target.files as FileList
          setImage(selectedFiles?.[0])
          setImageUrl(URL.createObjectURL(selectedFiles?.[0]))
          setUploaded(false)
        }} />
        <textarea value={description} placeholder='image description' onChange={(e) => setDescription(e.target.value)} />
        <input className={styles.alt} value={alt} type='text' placeholder='image alt text' onChange={(e) => setAlt(e.target.value)} />
        <button onClick={handleSubmit}>submit!!</button>
        {uploaded && <p style={{ color: '#019563' }}>File uploaded successfully!</p>}
      </div>
      {imageUrl && 
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Image src={imageUrl} alt='selected image' fill style={{ objectFit: 'contain' }} />
        </div>
      }
    </div>
  )
}