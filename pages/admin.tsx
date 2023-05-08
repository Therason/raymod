import styles from '@/styles/Upload.module.css'
import { useState } from 'react'

export default function Upload() {
  // upload form state
  const [ image, setImage ] = useState<File>()
  const [ description, setDescription ] = useState('')
  const [ alt, setAlt ] = useState('')
  const [ uploaded, setUploaded ] = useState(false)

  // navigation state
  const [ gallery, setGallery ] = useState(false)

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList
    setImage(selectedFiles?.[0])
    setUploaded(false)
  }

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('image', image as Blob)
    form.append('description', description)

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
        {/* UI switcher */}
        <button onClick={() => setGallery(!gallery)}>{gallery ? 'upload...' : 'gallery...'}</button>

        {/* file upload */}
        {!gallery &&      
          <div className={styles.upload}>
            <label>
              <input type="file" accept="image/*" onChange={selectImage} />
            </label>
            <button onClick={handleSubmit}>submit!!</button>
            {uploaded && <p style={{ color: '#019563' }}>File uploaded successfully!</p>}
            <input type='text' placeholder='image description' onChange={(e) => setDescription(e.target.value)} />
            <input type='text' placeholder='image alt text' onChange={(e) => setAlt(e.target.value)} />
          </div>
        }

        {/* gallery config */}
        {gallery && 
          <div className={styles.gallery}>

          </div>
        }
      </main>
    </>
  )
}

