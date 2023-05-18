import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '@/styles/Login.module.css'

export default function Login() {
  const router = useRouter()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ invalid, setInvalid ] = useState(false)

  const handleSubmit = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if (result && !result.error && result.ok) {
      router.push('/admin')
    } else {
      setInvalid(true)
    }
  }

  return (
    <main className={styles.main}>
      <div className={`border ${styles.container}`}>
        <label>Username:
          <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <label>Password:
          <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {invalid && <p style={{ color: 'darksalmon' }}>get outta here !!!</p>}
        {/* <button onClick={async () => await signOut()}>sign out?</button> */}
      </div>
    </main>
  )
}