'use client'
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {}

const page = (props: Props) => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])
    
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        } 
    }, [token])

    return (
        <div>
            <h1 className="flex items-center flex-col max-w-md mx-auto">Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2>EMAIL VERIFIED</h2>
                    <Link href="/">login</Link>
                </div>
            )}
            
            {error && (
                <div>
                    <h2>ERROR VERIFYING EMAIL</h2>
                    <Link href="/">login</Link>
                </div>
            )}
        </div>
    )
}

export default page