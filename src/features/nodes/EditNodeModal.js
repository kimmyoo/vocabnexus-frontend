import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { nanoid } from 'nanoid'

const EditNodeModal = ({ nodeId, userId, closeEditModal }) => {
    const axiosPrivate = useAxiosPrivate()
    const user = userId
    const [node, setNode] = useState({
        word: "",
        meanings: []
    })
    const [outboundNexus, setOutboundNexus] = useState([])
    const [selectedNexusId, setSelectedNexusId] = useState("")
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)



    useEffect(() => {
        // get node object detail and set node
        const getNodeDetail = async () => {
            try {
                const response = await axiosPrivate.get(`/nodes/detail/${userId}/${nodeId}`)
                setNode(response.data)
            } catch (err) {
                console.error(err)
            }
        }

        // get all nenux
        const getOutboundNexus = async () => {
            try {
                const response = await axiosPrivate.get(`/nexus/${userId}/${nodeId}`)
                setOutboundNexus(response?.data.outbound)
            } catch (err) {
                console.error(err)
            }
        }

        getOutboundNexus()
        getNodeDetail()

    }, [userId, nodeId, axiosPrivate])


    const handleWordChange = (e) => {
        const { name, value } = e.target
        setNode({
            ...node,
            [name]: value.trim().toLowerCase()
        })
    }

    // Function to handle changes in the definition, partOfSpeech, and sentence fields
    const handleMeaningChange = (e, index) => {
        const { name, value } = e.target
        // console.log(name, value)
        setNode(prevState => {
            const updatedMeanings = [...prevState.meanings];
            updatedMeanings[index][name] = value ? value : ""
            return { ...prevState, meanings: updatedMeanings };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosPrivate.patch('nodes/update', { node, user })
            .then(response => {
                console.log(response.data.message)
                closeEditModal()
            })
            .catch(err => {
                console.error(err.message)
            })
    }


    const handleDeleteNexus = (nexusId) => {
        setShowDeletePrompt(true)
        setSelectedNexusId(nexusId)
    }

    // confirm and delete nexus
    const confirmNexusDeletion = () => {

        axiosPrivate.delete(`nexus/${userId}/${node._id}/${selectedNexusId}`)
            .then(response => {
                console.log(response.data.message)
                closeEditModal()
            })
            .catch(err => {
                console.error(err.message)
            })

    }

    const cancelNexusDeletion = () => {
        setShowDeletePrompt(false)
        setSelectedNexusId("")
    }

    const content = (
        <div className='modal editNode'>
            <form>
                <h4>Edit Mode</h4>
                <input
                    type="text"
                    name="word"
                    value={node.word}
                    onChange={handleWordChange}
                />
                <hr />
                {
                    node.meanings?.map((meaning, index) => {
                        return (
                            <div>
                                <span>def. {index + 1}</span>
                                <select
                                    name="partOfSpeech"
                                    value={meaning.partOfSpeech}
                                    onChange={e => handleMeaningChange(e, index)}
                                >
                                    <option value="">Select</option>
                                    <option value="verb">Verb</option>
                                    <option value="noun">Noun</option>
                                    <option value="adj.">Adjective</option>
                                    <option value="adv.">Adverb</option>
                                    <optgroup label="Word Affix">
                                        <option value="prefix">prefix--</option>
                                        <option value="base word">base</option>
                                        <option value="suffix">--suffix</option>
                                    </optgroup>
                                    <option value="other">other</option>
                                </select>

                                <textarea
                                    rows="2"
                                    type="text"
                                    name="definition"
                                    value={meaning.definition}
                                    onChange={e => handleMeaningChange(e, index)}
                                    placeholder='definition of word. required.'
                                />

                                {
                                    meaning.sentence &&
                                    <>
                                        <label>example sentence</label>
                                        <textarea
                                            rows="3"
                                            type="text"
                                            name="sentence"
                                            value={meaning.sentence}
                                            onChange={e => handleMeaningChange(e, index)}
                                        />
                                    </>
                                }
                            </div>
                        )
                    })
                }

                {
                    outboundNexus && outboundNexus.map((nexus, index) => {
                        return <p
                            className={nexus._id === selectedNexusId ? "selected" : ""}
                            key={nanoid()}
                        >
                            <button
                                type="button"
                                className='warning'
                                onClick={(e) => handleDeleteNexus(nexus._id)}
                            >X
                            </button>

                            ----&gt;{nexus.word}
                        </p>
                    })
                }

                {
                    showDeletePrompt &&
                    <span>
                        delete highlighted nexus?
                        <button
                            type='button'
                            onClick={confirmNexusDeletion}
                        >Yes</button>
                        <button
                            type='button'
                            onClick={cancelNexusDeletion}
                        >No
                        </button>
                    </span>
                }
                <br />
                <button
                    type="submit"
                    className='float-right'
                    onClick={handleSubmit}
                >Submit</button>
                <button type="button" className='' onClick={closeEditModal}>close</button>
                <button className='warning'>Delete Node</button>
            </form>
        </div>
    )

    return (
        content
    )
}

export default EditNodeModal