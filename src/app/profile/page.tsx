'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const Profile = (props: Props) => {
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex items-center flex-col max-w-md mx-auto'>
        <h1>Profile</h1>
        <button onClick={logout} className='bg-orange-400 p-4 w-full rounded-md mb-8'>Logout</button>
    </div>
  )
}

export default Profile