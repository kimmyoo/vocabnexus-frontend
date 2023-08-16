import React from 'react'
import { useState, useEffect } from 'react'
// import axios from '../../api/axios'
// import AuthContext from '../../context/AuthProvider'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import QuickSearch from '../search/QuickSearch'
import useLogout from '../../hooks/useLogout'

const UserProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { auth } = useAuth()
    const userId = auth.userId
    const axiosPrivate = useAxiosPrivate()
    const [userProfileData, setUserProfileData] = useState()
    const logout = useLogout()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUserProfile = async () => {
            try {
                const response = await axiosPrivate.get(`/user/`, {
                    signal: controller.signal
                })
                // console.log(response.data)
                isMounted && setUserProfileData(response.data)
            } catch (err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUserProfile()
        // return () => {
        //     isMounted = false
        //     controller.abort()
        // }
    }, [userId, axiosPrivate, navigate, location])

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <section className='content-wrapper'>
            <div className="profile-grid-container">
                <div className="grid-item">
                    <p><span>User: </span>{userProfileData?.user?.username}</p>
                    <p><span>Level: </span>{userProfileData?.user?.level}</p>
                    <p><span>Account Created: </span>{userProfileData?.user?.createdAt.split("T")[0]}</p>
                    <p><span>Words added:</span> {userProfileData?.numOfNodes}</p>
                    <p><span>Nexus established:</span> {userProfileData?.numOfNexus}</p>
                    <p><Link to={`nodes/${userId}`}>View All words</Link></p>
                    <button type='button' onClick={signOut}>Sign Out</button>
                </div>
                <div className="grid-item">
                    <QuickSearch />
                </div>


            </div>
            <div className="profile-grid-container">
                <div className="grid-item">
                    <h3>ungrasped words</h3>
                    <ol>
                        {userProfileData?.unGraspedList.slice(0, 8).map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                        <li>more...</li>
                    </ol>
                </div>
                <div className="grid-item">
                    <h3>Words liked</h3>
                    <ol>
                        {userProfileData?.likedList.slice(0, 8).map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                        <li>more...</li>
                    </ol>
                </div>
            </div>
            <div className='profile-grid-container'>
                <div className="grid-item">
                    <h3>Unconnected nodes</h3>
                    <ol>
                        {userProfileData?.unconnctedList.slice(0, 8).map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                        <li>more...</li>
                    </ol>
                </div>
            </div>
        </section >
    )
}

export default UserProfile