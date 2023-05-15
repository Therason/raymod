import styles from '@/styles/AdminUpload.module.css'
import { useState } from 'react'

export default function AdminUpload(
  { revalidate, image, setImage, uploaded, setUploaded }: 
  { revalidate: any, image: File | undefined, setImage: any, uploaded: boolean, setUploaded: any }
) {
  const [ description, setDescription ] = useState('')
  const [ alt, setAlt ] = useState('')

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
    console.log(data)

    // revalidate
    await revalidate()

    // reset state
    setUploaded(true)
    setDescription('')
    setAlt('')
  }

  return (
    <div className={styles.upload}>
      <div>
        <label>
          <input type="file" accept="image/*" onChange={(e) => {
            const selectedFiles = e.target.files as FileList
            setImage(selectedFiles?.[0])
            setUploaded(false)
          }} />
        </label>
        <button onClick={handleSubmit}>submit!!</button>
        {uploaded && <p style={{ color: '#019563' }}>File uploaded successfully!</p>}
        <input value={alt} type='text' placeholder='image alt text' onChange={(e) => setAlt(e.target.value)} />
      </div>
      <textarea value={description} rows={3} cols={40} placeholder='image description' onChange={(e) => setDescription(e.target.value)} />
    </div>
  )
}