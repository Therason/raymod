import styles from '@/styles/Upload.module.css'
import { useState } from 'react'

export default function Upload() {
  const [ image, setImage ] = useState<File>()

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList
    setImage(selectedFiles?.[0])
  }

  const handleSubmit = async () => {
    console.log(image)
    const form = new FormData()
    form.append('image', image as Blob)

    // uploads are forbidden through localhost for some reason...
    // this also should not be client side...
    // const res = await fetch('https://api.imgur.com/3/image', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT}`
    //   },
    //   body: form
    // })
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT}`
      },
      body: form
    })
    const data = await res.json()
    console.log(data)
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