import React from 'react'
import { useRef, useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useNavigate, Link } from 'react-router-dom'
const LOGIN_URL = '/auth'

const Login = () => {
    // once it authenticated, use setAuth to set state in context provider
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
            // console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            const userId = response?.data?.userId
            setAuth({ user, userId, accessToken })
            setUser('')
            setPwd('')
            setSuccess(true)
            navigate("/user-dash")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("no server response, check networkd")
            } else if (err.response?.status === 400) {
                setErrMsg('missing username or password')
            } else if (err.response?.status === 401) {
                setErrMsg('wrong password or username')
            } else {
                setErrMsg("Login failed")
            }
            errRef.current.focus()
        }

    }

    return (
        <>
            {
                success
                    ?
                    (
                        <p>Hello {user}! You are logged in and will be directed to User Profile page in 3s. </p>
                    )
                    :
                    (
                        <section>
                            <div className='form sign-in content-wrapper'>

                                <h1>Sign In</h1>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        ref={userRef}
                                        type="text"
                                        id="username"
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setUser(e.target.value)
                                        }}
                                        value={user} // controlled input
                                        required
                                    /> <br />
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) => {
                                            setPwd(e.target.value)
                                        }}
                                        value={pwd} // controlled input
                                        required
                                        autoComplete='on'
                                    />
                                    <p>
                                        <button>sign in</button>
                                    </p>
                                    <p>
                                        <Link to="/register">Need an account? Register here</Link>
                                    </p>
                                    <p
                                        ref={errRef}
                                        className="errmsg"
                                        aria-live='assertive'
                                    >
                                        {errMsg}
                                    </p>
                                </form>
                            </div>
                        </section>
                    )
            }
        </>
    )
}

export default Login