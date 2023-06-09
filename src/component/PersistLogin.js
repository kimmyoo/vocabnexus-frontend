import React from 'react'
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.log(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => {
            isMounted = false
        }
    }, [auth.accessToken, refresh])

    const content = (
        <>
            {isLoading
                ? <p>...loading</p>
                : <Outlet />
            }
        </>
    )

    return (
        content
    )
}

export default PersistLogin