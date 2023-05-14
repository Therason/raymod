import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

    console.log(result)

    if (result && !result.error && result.ok) {
      router.push('/admin')
    } else {
      setInvalid(true)
    }
  }

  return (
    <>
      <label>Username:
        <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
      </label>
      <label>Password:
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button onClick={handleSubmit}>Submit</button>
      {invalid && <p style={{ color: 'darksalmon' }}>get outta here !!!</p>}
    </>
  )
}