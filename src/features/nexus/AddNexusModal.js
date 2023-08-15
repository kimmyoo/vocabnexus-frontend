import React from 'react'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { nanoid } from 'nanoid'
import { nexusNodeValidation } from '../../common/utility'
import { canSubmit } from '../../common/utility'


const AddNexusModal = ({ nodeId, closeNexusModal }) => {
    const axiosPrivate = useAxiosPrivate()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [formData, setFormData] = useState({
        nexusType: "",
        explanation: "",
        word: "",
        errors: {}
    })

    useEffect(() => {
        const searchWords = async () => {
            axiosPrivate.post(`nodes/word/search?q=${searchQuery}`)
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

    }, [searchQuery, axiosPrivate])

    const selectNodeFromRes = (node) => {
        setFormData({
            ...formData,
            word: node.word
        })
    }

    const handleNexusInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = nexusNodeValidation(formData)
        if (canSubmit(errors)) {
            const dataForSubmission = {}
            dataForSubmission.id = nodeId
            dataForSubmission.word = formData.word.toLowerCase().trim() // ensure words are all lowercase
            dataForSubmission.nexusType = formData.nexusType
            dataForSubmission.explanation = formData.explanation ? formData.explanation.trim() : null

            axiosPrivate.post('nexus/', dataForSubmission)
                .then(response => {
                    console.log("form submission is successful:", response.data)
                    closeNexusModal()
                })
                .catch(error => {
                    console.error("Error submission error:", error)
                })
            // console.log(formData)
        } else {
            setFormData((prevData) => ({
                ...prevData,
                errors,
            }))
        }
    }

    const content = (
        <div className='modal addNexus'>
            <div>
                <div>
                    <h4>1. Search</h4>
                    <label htmlFor="search">
                        <input
                            id="search"
                            placeholder='search from existing nodes...'
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                        />
                    </label>
                    <div className='search-result'>returned entries:
                        {
                            searchResult && searchResult.map(node => {
                                return <button
                                    className='individual-word'
                                    key={nanoid()}
                                    onClick={() => {
                                        selectNodeFromRes(node)
                                    }}
                                >
                                    {node.word}
                                </button>
                            })
                        }
                    </div>
                </div>
                <hr />
                <h4>2. or create a new node with a new word</h4>
                <form>
                    <div className="node-nexus">
                        <div>
                            <div className="satelliteNexus">

                                <select
                                    name="nexusType"
                                    value={formData.type}
                                    onChange={handleNexusInputChange}
                                >
                                    <option value="">Nexus Type*</option>
                                    <option value="prefix">prefix</option>
                                    <option value="suffix">suffix</option>
                                    <option value="synonym">synonym</option>
                                    <option value="antonym">Antonym</option>
                                    <option value="->adjective">adjective form</option>
                                    <option value="->adverb">Adverb form</option>
                                    <option value="->noun">Noun form</option>
                                    <option value="->verb">Verb form</option>
                                    <option value="etymology">Etymology</option>
                                    <option value="pronunciation">Pronunciation</option>
                                    <option value="spelling">Spelling</option>
                                    <option value="other">Other</option>
                                </select>
                                <span className='errmsg'>{formData.errors.nexusType}</span>
                            </div>
                            <span className='errmsg'>{formData.errors.word}</span>
                        </div>
                    </div>
                    <div className="node-nexus">
                        <div className="satelliteNode outbound">
                            <p>
                                <input
                                    name="word"
                                    type="text"
                                    value={formData.word}
                                    placeholder='word in node*'
                                    onChange={handleNexusInputChange}
                                /></p>
                        </div>
                    </div>
                    <textarea
                        name="explanation"
                        cols="150"
                        rows="2"
                        placeholder='brief explanation'
                        onChange={handleNexusInputChange}
                    ></textarea>
                    <button className='float-right' onClick={handleSubmit}>Add</button>
                    <button type="button" onClick={closeNexusModal}>close</button>
                </form>
            </div>

        </div>
    )

    return (
        content
    )
}

export default AddNexusModal