import styles from '@/styles/Upload.module.css'
import { useState } from 'react'
import Navbar from '@/components/navbar'

export default function Upload() {
  const [ image, setImage ] = useState<File>()

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList
    setImage(selectedFiles?.[0])
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
  }

  return (
    <>
      <Navbar />
      <main className={`${styles.main}`}>
        <h1>Admin Stuff :D</h1>
        <div>
          <label>
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
          <button onClick={handleSubmit}>submit!!</button>
        </div>
        <div className="gallery"></div>
      </main>
    </>
  )
}