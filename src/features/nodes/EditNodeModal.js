import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Meaning from '../../component/Meaning'

const EditNodeModal = ({ nodeId, userId, closeEditModal }) => {
    const axiosPrivate = useAxiosPrivate()
    const user = userId
    const [node, setNode] = useState({
        word: "",
        meanings: []
    })
    const [outboundNexus, setOutboundNexus] = useState([])



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
        setNode(prevState => {
            const updatedMeanings = [...prevState.meanings];
            updatedMeanings[index][name] = value.trim() ? value : null
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

    const content = (
        <div className='modal editNode'>
            <form>
                <h4>Edit word in node</h4>
                <input
                    type="text"
                    name="word"
                    value={node.word}
                    onChange={handleWordChange}
                />
                <hr />
                <h4>Edit Definitions</h4>
                {
                    node.meanings?.map((meaning, index) => {
                        return <Meaning
                            handleMeaningChange={handleMeaningChange}
                            meaning={meaning}
                            index={index}
                        />
                    })
                }

                {
                    outboundNexus && outboundNexus.map(n => {
                        return <p><button>X</button>----&gt;{n.word}</p>
                    })
                }
                <br />
                <button
                    className='float-right'
                    onClick={handleSubmit}
                >Submit</button>
                <button className='' onClick={closeEditModal}>close</button>
                <button>Delete Node</button>
            </form>
        </div>
    )

    return (
        content
    )
}

export default EditNodeModal