'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Props = {}

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("signup success")
      router.push("/profile")

    } catch (error: any) {
      console.log("Signup failed", error.message)

    } finally {
      setLoading(false); // Make loading go away
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex items-center flex-col max-w-md mx-auto'>
      <h1 className='text-2xl mb-4'>Login</h1>
      <hr className='border-t border-gray-300 my-4'/>

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

      <button onClick={onLogin} className=' bg-orange-400 p-4 w-full rounded-md mb-8'>Sign Up</button>

      <span className='text-sm'><Link href="/signup">signup </Link> instead</span>
    </div>
  )
}

export default LoginPage;