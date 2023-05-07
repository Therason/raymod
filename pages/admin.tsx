import styles from '@/styles/Upload.module.css'
import { useState } from 'react'

export default function Upload() {
  const [ image, setImage ] = useState<File>()
  const [ uploaded, setUploaded ] = useState(false)

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList
    setImage(selectedFiles?.[0])
    setUploaded(false)
  }

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('image', image as Blob)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })
    const data = await res.json()
    console.log(data)
    setUploaded(true)
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <h1>Admin Stuff :D</h1>
        <div>
          <label>
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
          <button onClick={handleSubmit}>submit!!</button>
          {uploaded && <p style={{ color: '#019563' }}>File uploaded successfully!</p>}
        </div>
        <div className="gallery"></div>
      </main>
    </>
  )
}