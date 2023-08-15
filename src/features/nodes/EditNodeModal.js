import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { nodeEditValidation } from '../../common/utility'
import { canSubmit } from '../../common/utility'

const EditNodeModal = ({ nodeId, closeEditModal }) => {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    // const user = userId
    const [node, setNode] = useState({
        word: "",
        meanings: []
    })
    const [errors, setErrors] = useState({})
    const [outboundNexus, setOutboundNexus] = useState([])
    const [selectedNexusId, setSelectedNexusId] = useState("")
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)
    const [showNodeDeletePrompt, setShowNodeDeletePromp] = useState(false)


    useEffect(() => {
        // get node object detail and set node
        const getNodeDetail = async () => {
            try {
                const response = await axiosPrivate.get(`/nodes/detail/${nodeId}`)
                setNode(response.data)
            } catch (err) {
                console.error(err)
            }
        }

        // get all nenux
        const getOutboundNexus = async () => {
            try {
                const response = await axiosPrivate.get(`/nexus/${nodeId}`)
                setOutboundNexus(response?.data.outbound)
            } catch (err) {
                console.error(err)
            }
        }

        getOutboundNexus()
        getNodeDetail()

    }, [nodeId, axiosPrivate])


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
        const errors = nodeEditValidation(node)
        if (canSubmit(errors)) {
            axiosPrivate.patch('nodes/update', { node })
                .then(response => {
                    console.log(response.data.message)
                    closeEditModal()
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            setErrors(errors)
        }

    }

    // nexus deletion handle, confirm and cancel functions.
    const handleDeleteNexus = (nexusId) => {
        setShowDeletePrompt(true)
        setSelectedNexusId(nexusId)
    }

    // confirm and delete nexus
    const confirmNexusDeletion = () => {
        axiosPrivate.delete(`nexus/${node._id}/${selectedNexusId}`)
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


    // node deletion handler, confirm, and cancel functions
    const handleDeleteNode = () => {
        setShowNodeDeletePromp(true)
    }

    const confirmNodeDeletion = () => {
        axiosPrivate.delete(`nodes/detail/${node._id}`)
            .then(response => {
                console.log(response.data.message)
                closeEditModal()
                navigate('/user-dash')
            })
            .catch(err => {
                console.error(err)
            })
    }

    const cancelNodeDeletion = () => {
        setShowDeletePrompt(false)
        closeEditModal()
    }



    const content = (
        <div className='modal edit-node'>
            <form>
                <h4>Edit Mode</h4>
                <span className='errmsg'>{errors.word}</span>
                <input
                    type="text"
                    name="word"
                    value={node.word}
                    onChange={handleWordChange}
                />
                <hr />
                <span className='errmsg'>{errors.meanings}</span>
                {
                    node.meanings?.map((meaning, index) => {
                        const meaningKey = `meaning-${index}`;
                        return (
                            <div key={meaningKey}>
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
                                    rows="1"
                                    type="text"
                                    name="definition"
                                    value={meaning.definition}
                                    onChange={e => handleMeaningChange(e, index)}
                                    placeholder='definition of word. required.'
                                />

                                {
                                    meaning.sentence &&
                                    <>
                                        <label htmlFor="sentence">example sentence</label>
                                        <textarea
                                            id='sentence'
                                            rows="2"
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
                {/* prompt to confirm nexus deletion */}
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
                {/* prompt to confirm node deletion */}
                {
                    showNodeDeletePrompt && <div>
                        <span className='selected'>
                            deleting this node will delete all nexus conencted to it, please confirm deletion.
                        </span>
                        <button
                            type='button'
                            onClick={confirmNodeDeletion}
                        >Yes</button>
                        <button
                            type='button'
                            onClick={cancelNodeDeletion}
                        >No
                        </button>
                    </div>
                }
                <br />
                <button
                    type="submit"
                    className='float-right'
                    onClick={handleSubmit}
                >Submit</button>
                <button type="button" className='' onClick={closeEditModal}>close</button>
                <button type="button" className='warning' onClick={handleDeleteNode}>Delete Node</button>
            </form>
        </div>
    )

    return (
        content
    )
}

export default EditNodeModal