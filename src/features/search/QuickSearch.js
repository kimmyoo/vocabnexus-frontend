import React from 'react'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'



const QuickSearch = ({ userId }) => {
    const axiosPrivate = useAxiosPrivate()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        const searchWords = async () => {
            axiosPrivate.post(`nodes/word/search?q=${searchQuery}`, { user: userId })
                .then(response => {
                    setSearchResult(response.data)
                })
                .catch(err => {
                    console.error(err.message)
                })
        }
        const debouncedSearch = setTimeout(() => {
            if (searchQuery) {
                searchWords()
            } else {
                setSearchResult([])
            }
        }, 500)
        return () => clearTimeout(debouncedSearch)
    }, [searchQuery, userId, axiosPrivate])

    const content = (
        <div>
            <h3>Quick Search</h3>
            <div>
                <input
                    placeholder='search...'
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                />
                <div className='search-result'>matching entries:
                    {
                        searchResult && searchResult.map(node => {
                            return <button
                                className='individual-word'
                                key={nanoid()}
                            >
                                <Link to={`nodes/detail/${node._id}`}>{node.word}</Link>
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )

    return (
        content
    )
}

export default QuickSearch