import styles from '@/styles/Upload.module.css'
import { useState, useEffect } from 'react'
import AdminGallery from '@/components/adminGallery'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export default function Admin() {
  const {data: session, status} = useSession()

  // upload form state
  const [ image, setImage ] = useState<File>()
  const [ description, setDescription ] = useState('')
  const [ alt, setAlt ] = useState('')
  const [ uploaded, setUploaded ] = useState(false)

  // navigation state
  const [ viewGallery, setViewGallery ] = useState(false)

  // images for gallery
  const [ images, setImages ] = useState([])
  // const [ oldImages, setOldImages] = useState([])
  useEffect(() => {
    console.log('session:', session, status)
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        setImages(data.images)
        // "backup" to compare against when editing data
        // setOldImages(data.images)
      })
  }, [])

  // file upload functions
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

    // reset state
    setUploaded(true)
    setDescription('')
    setAlt('')
  }

  // gallery functions
  const handleDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    // rearrange images state
    const newOrder = Array.from(images)
    const [ removed ] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)
    setImages(newOrder)
  }

  const handleSave = async () => {
    console.log('images:', images)
    const res = await fetch('/api/edit', {
      method: 'POST',
      body: JSON.stringify(images)
    })
    const data = await res.json()
    console.log('save res:', data)
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
            <button onClick={handleSave}>save</button>
            <DragDropContext onDragEnd={handleDragEnd}>
              <AdminGallery images={images} setImages={setImages}/>
            </DragDropContext>
          </>
        }
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session
    }
  }
}
