import styles from '@/styles/Upload.module.css'
import { useState, useEffect } from 'react'
import AdminGallery from '@/components/adminGallery'

export default function Upload() {
  // upload form state
  const [ image, setImage ] = useState<File>()
  const [ description, setDescription ] = useState('')
  const [ alt, setAlt ] = useState('')
  const [ uploaded, setUploaded ] = useState(false)

  // navigation state
  const [ viewGallery, setViewGallery ] = useState(false)

  // images for gallery
  const [ images, setImages ] = useState([])
  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
  }, [])

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
        <h3 onClick={() => setViewGallery(!viewGallery)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{viewGallery ? 'upload new image...' : 'edit gallery...'}</h3>

        {/* file upload */}
        {!viewGallery &&      
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
        {viewGallery && 
          <>
            <h2>Admin Gallery</h2>
            <AdminGallery images={images} setImages={setImages}/>
          </>
        }
      </main>
    </>
  )
}

