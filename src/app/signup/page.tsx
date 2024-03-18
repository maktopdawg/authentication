'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toast } from 'react-hot-toast';
import axios from 'axios';

type Props = {}

const SignUpPage = (props: Props) => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("signup success")
      router.push("/login")

    } catch (error: any) {
        console.log("Signup failed", error.message)

    } finally {
      setLoading(false); // Make loading go away
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex items-center flex-col max-w-md mx-auto'>
      <h1 className='text-2xl mb-4'>{loading ? "Processing" : "Signup"}</h1>
      <hr className='border-t border-gray-300 my-4'/>

      <label htmlFor="username" className='text-gray-600'>Username</label>
      <input 
        type="text" 
        value={user.username} 
        onChange={(e: any) => setUser({...user, username: e.target.value})}
        id="username"
        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 mb-4 text-black'
        placeholder='Username' 
      />

      <label htmlFor="email" className='text-gray-600'>Email</label>
      <input 
        type="email" 
        value={user.email} 
        onChange={(e: any) => setUser({...user, email: e.target.value})}
        id="email"
        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 mb-4 text-black'
        placeholder='Email' 
      />

      <label htmlFor="password" className='text-gray-600'>Password</label>
      <input 
        type="password" 
        value={user.password} 
        onChange={(e: any) => setUser({...user, password: e.target.value})}
        id="password"
        className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 mb-4 text-black'
        placeholder='Password' 
      />

      { buttonDisabled === false && <button onClick={onSignup} className=' bg-orange-400 p-4 w-full rounded-md mb-8'>Sign Up</button>}

      <span className='text-sm'><Link href="/login">login </Link> instead</span>
    </div>
  )
}

export default SignUpPage