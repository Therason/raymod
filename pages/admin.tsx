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
    console.log('revalidate:', data)
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

    // revalidate
    await revalidate()
  }

  return (
    <>
      <main className={styles.main}>
        <h1>Admin Stuff :D</h1>
        <span className={styles.line}></span>
        <div className={styles.container}>
          <div className={styles.menu}>
            {/* UI switcher */}
            {/* <h3 onClick={() => setViewGallery(!viewGallery)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{viewGallery ? 'upload new image...' : 'edit gallery...'}</h3> */}
            <span className={styles.switcher} onClick={() => setViewGallery(false)} style={viewGallery ? {} : { textDecoration: 'underline' }}>upload image</span>
            <span className={styles.switcher} onClick={() => setViewGallery(true)} style={viewGallery ? { textDecoration: 'underline' } : {}}>edit gallery</span>
          </div>

          {/* file upload */}
          {!viewGallery && 
            <AdminUpload revalidate={revalidate} image={image} setImage={setImage} uploaded={uploaded} setUploaded={setUploaded} />
          }

          {/* gallery config */}
          {viewGallery && 
            <div>
              <span style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', gap: '2rem'}}>
                <h3>delete/edit/rearrange things!!</h3>
                <button onClick={handleSave}><h3>save</h3></button>
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
