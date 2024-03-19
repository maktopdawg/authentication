'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const Profile = (props: Props) => {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }

  return (
    <div className='flex items-center flex-col max-w-md mx-auto'>
        <h1>Profile</h1>
        <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button onClick={logout} className='bg-orange-400 p-4 w-full rounded-md mb-8'>Logout</button>
        <button onClick={getUserDetails} className='bg-orange-500 p-4 w-full rounded-md mb-8'>Get user details</button>
    </div>
  )
}

export default Profile