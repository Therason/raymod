import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Login() {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })
    console.log(result)
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
    </>
  )
}