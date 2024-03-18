import React from 'react'

type Props = {}

const UserProfile = ({ params }: any) => {
  return (
    <div className='flex items-center flex-col max-w-md mx-auto'>
        <h1>UserProfile</h1>
        <p>{params.id}</p>
    </div>
  )
}

export default UserProfile