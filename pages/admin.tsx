import styles from '@/styles/Upload.module.css'
import { useState } from 'react'
import AdminGallery from '@/components/adminGallery'
// import { DndContext } from '@dnd-kit/core'

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
    form.append('alt', alt)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })
    const data = await res.json()
    console.log(data)
    setUploaded(true)
    setDescription('')
    setAlt('')
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <h1>Admin Stuff :D</h1>
        {/* UI switcher */}
        <h3 onClick={() => setGallery(!gallery)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{gallery ? 'upload new image...' : 'edit gallery...'}</h3>

        {/* file upload */}
        {!gallery &&      
          <div className={styles.upload}>
            <div>
              <label>
                <input type="file" accept="image/*" onChange={selectImage} />
              </label>
              <button onClick={handleSubmit}>submit!!</button>
              {uploaded && <p style={{ color: '#019563' }}>File uploaded successfully!</p>}
              <input value={alt} type='text' placeholder='image alt text' onChange={(e) => setAlt(e.target.value)} />
            </div>
            <textarea value={description} rows={3} cols={40} placeholder='image description' onChange={(e) => setDescription(e.target.value)} />
          </div>
        }

        {/* gallery config */}
        {gallery && 
          // <DndContext>
            <AdminGallery />
          // /DndContext>
        }
      </main>
    </>
  )
}

