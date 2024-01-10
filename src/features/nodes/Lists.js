import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useParams, Link } from 'react-router-dom'
import { nanoid } from 'nanoid'


const Lists = () => {
    const { userId } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const [allNodes, setAllNodes] = useState([])

    useEffect(() => {
        axiosPrivate.get('/nodes/')
            .then(response => {
                setAllNodes(response.data)
            })
            .catch(err => {
                console.error(err)
            })

    }, [axiosPrivate, userId])



    const content = (
        <div className='content-wrapper'>
            <div className='indexList'>
                <h3>All Nodes List</h3>
                <p>
                    {
                        // mapping each key to a link element and point link to corresponding div with id
                        Object.entries(allNodes).map(([key]) => {
                            return <a key={nanoid()} href={`#${key}`}>{key.toUpperCase()}&nbsp;&nbsp; </a>
                        })
                    }
                </p>
            </div>
            <div className='grid-container'>
                {
                    Object.entries(allNodes).map(([key, groupedList]) => {
                        return (
                            <div key={nanoid()} id={key} className='grid-item'>
                                <h3>{key}</h3>
                                <ol>
                                    {
                                        groupedList.map(node =>
                                            <li key={nanoid()}>
                                                <Link to={`/user-dash/nodes/detail/${node._id}`}>{node.word} ({node.nexus.length})</Link>
                                            </li>)
                                    }
                                </ol>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
    return (
        content
    )
}

export default Lists