import styles from '@/styles/Upload.module.css'
import { useState } from 'react'

export default function Upload() {
  const [ image, setImage ] = useState<File>()

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList
    setImage(selectedFiles?.[0])
  }

  const handleSubmit = () => {
    console.log('heyyy :)')
    console.log(image)
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <h1>Upload :D</h1>
        <div>
          <label>
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
          <button onClick={handleSubmit}>submit!!</button>
        </div>
      </main>
    </>
  )
}