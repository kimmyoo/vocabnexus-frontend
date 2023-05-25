import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
const LOGIN_URL = '/auth'



const Login = () => {
    // once it authenticated, use setAuth to set state in context provider
    const { setAuth } = useContext(AuthContext)
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
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            const userId = response?.data?.userId
            setAuth({ user, userId, pwd, accessToken })
            // setUser('')
            setPwd('')
            setSuccess(true)
            navigate("/user-dash")


        } catch (err) {
            if (!err?.response) {
                setErrMsg("no server response")
            } else if (err.response?.status === 400) {
                setErrMsg('missing username or password')
            } else if (err.response?.status === 401) {
                setErrMsg('unauthorized')
            } else {
                setErrMsg("login failed")
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
                                    />
                                    <p>
                                        <button>sign in</button>
                                        <button className='float-right'>Register</button>
                                        <span className='float-right'>Need an account?</span>
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