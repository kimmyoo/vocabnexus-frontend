import React from 'react'
import { useState, useEffect, useContext } from 'react'
// import axios from '../../api/axios'
import AuthContext from '../../context/AuthProvider'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import QuickSearch from '../search/QuickSearch'

const UserProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const userId = auth.userId
    const axiosPrivate = useAxiosPrivate()
    const [userProfileData, setUserProfileData] = useState()


    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axiosPrivate.get(`/user/${userId}`)
                // console.log(response.data)
                setUserProfileData(response.data)

            } catch (err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUserProfile()
    }, [userId, axiosPrivate, navigate, location])


    return (
        <section className='content-wrapper'>

            <div className="container">
                <div className="profile-left">
                    <p><span>User: </span>{userProfileData?.user?.username}</p>
                    <p><span>Level: </span>{userProfileData?.user?.level}</p>
                    <p><span>Account Created: </span>{userProfileData?.user?.createdAt}</p>
                    <p><span>Words added:</span> {userProfileData?.numOfNodes}</p>
                    <p><span>Nexus established:</span> {userProfileData?.numOfNexus}</p>
                </div>
                <div className="profile-center">
                    <h3>ungrasped words</h3>
                    <ol>
                        {userProfileData?.unGraspedList.map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                    </ol>
                </div>
                <div className="profile-right">
                    <h3>Unconnected nodes</h3>
                    <ol>
                        {userProfileData?.unconnctedList.map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                    </ol>
                </div>
            </div>
            <div className="container">
                <div className="profile-left">
                    <p><Link to={`nodes/${userId}`}>View All words</Link></p>
                    <p>more options...</p>
                </div>
                <div className="profile-center">
                    <h3>Words liked</h3>
                    <ol>
                        {userProfileData?.likedList.map(node => {
                            return <li key={node._id}><Link to={`nodes/detail/${node._id}`}>{node.word}</Link></li>
                        })}
                    </ol>
                </div>
                <div className="profile-right">
                    <QuickSearch userId={userId} />
                </div>
            </div>
        </section >
    )
}

export default UserProfile