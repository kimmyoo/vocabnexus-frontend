import { Outlet } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === false) {
            const verifyRefreshToken = async () => {
                // console.log("executed here")
                try {
                    await refresh()
                }
                catch (err) {
                    console.log(err)
                }
                finally {
                    setIsLoading(false)
                }
            }
            // only when there is no accessToken
            // only to check the refreshToken when it needs to
            !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

            return () => {
                // set effectRan.current to true so the second useEffect won't run in dev mode
                effectRan.current = true
            }
        }

    }, [auth.accessToken, isLoading, refresh])

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