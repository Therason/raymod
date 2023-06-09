import styles from '@/styles/Admin.module.css'
import { useState, useEffect } from 'react'
import AdminGallery from '@/components/adminGallery'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import AdminUpload from '@/components/adminUpload'

export default function Admin({ token }: { token: string }) {
  // navigation state
  const [ viewGallery, setViewGallery ] = useState(false)

  // upload form state
  const [ image, setImage ] = useState<File>()
  const [ uploaded, setUploaded ] = useState(false)

  // images for gallery
  const [ images, setImages ] = useState([])
  useEffect(() => {
    // refresh images when a new image gets uploaded
    if (uploaded || !image) {
      fetch('/api/images')
        .then(res => res.json())
        .then(data => {
          setImages(data.images)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploaded])

  // ISR helper
  const revalidate = async () => {
    const res = await fetch(`/api/revalidate?secret=${token}`)
    const data = await res.json()
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

  // saving gallery edits
  const [ saving, setSaving ] = useState(false)
  const [ saved, setSaved ] = useState(false)
  const handleSave = async () => {
    setSaved(false)
    setSaving(true)
    const res = await fetch('/api/edit', {
      method: 'POST',
      body: JSON.stringify(images)
    })
    const data = await res.json()

    // revalidate
    await revalidate()
    setSaving(false)
    setSaved(true)
  }

  return (
    <>
      <main className={styles.main}>
        <h1>Admin Stuff :D</h1>
        <span className={styles.line}></span>
        <div className={styles.container}>
          <div className={styles.menu}>
            {/* UI switcher */}
            <span className={styles.switcher} onClick={() => setViewGallery(false)} style={viewGallery ? {} : { textDecoration: 'underline' }}><h2>upload image</h2></span>
            <span className={styles.switcher} onClick={() => setViewGallery(true)} style={viewGallery ? { textDecoration: 'underline' } : {}}><h2>edit gallery</h2></span>
          </div>

          {/* file upload */}
          {!viewGallery && 
            <AdminUpload revalidate={revalidate} image={image} setImage={setImage} uploaded={uploaded} setUploaded={setUploaded} />
          }

          {/* gallery config */}
          {viewGallery && 
            <div>
              <span style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', gap: '2rem', padding: '1rem 0', alignItems: 'center' }}>
                <h3>delete/edit/rearrange things!!</h3>
                {saving && <h3>saving...</h3>}
                {saved && <h3 style={{ color: '#019563' }}>saved!</h3>}
                <button onClick={handleSave} className={`border ${styles.save}`}><h3>save</h3></button>
              </span>
              <DragDropContext onDragEnd={handleDragEnd}>
                <AdminGallery images={images} setImages={setImages} revalidate={revalidate}/>
              </DragDropContext>
            </div>
          }
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  // verify session
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // pass on revalidation token for ISR
  return {
    props: {
      token: process.env.REVALIDATE_TOKEN
    }
  }
}
