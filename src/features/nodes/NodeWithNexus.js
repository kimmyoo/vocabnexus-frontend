import React from 'react'
import CenterNode from '../../component/CenterNode'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import AuthContext from '../../context/AuthProvider'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import Outbound from '../../component/Outbound'
import InBound from '../../component/InBound'
import AddDefinitionModal from './AddDefinitionModal'
import AddNexusModal from '../nexus/AddNexusModal'
import EditNodeModal from './EditNodeModal'
// added webster api for accurate definitions
import { DICT_API_URL } from '../../api/websterApiBaseURL'
import axios from '../../api/axios'


const NodeWithNexus = () => {
    const { auth } = useContext(AuthContext)
    const userId = auth.userId
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    // state
    const [node, setNode] = useState({})
    const [nexusWithNodes, setNexusWithNodes] = useState({})
    const [showMeaning, setShowMeaning] = useState(false)
    const [isDefModalOpen, setIsDefModalOpen] = useState(false)
    const [isNexusModalOpen, setIsNexusModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [shortDefs, setShortDefs] = useState([])

    useEffect(() => {
        setShowMeaning(false)
        // get node object detail and set node
        const getNodeDetail = async () => {
            try {
                const response = await axiosPrivate.get(`/nodes/detail/${id}`)
                setNode(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        // get all nenux
        const getAllNexusWithNodes = async () => {
            try {
                const response = await axiosPrivate.get(`/nexus/${id}`)
                setNexusWithNodes(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        // reset modal states
        // setShowMeaning(false)
        // setIsDefModalOpen(false)
        getNodeDetail()
        getAllNexusWithNodes()
    }, [userId, id, axiosPrivate, isDefModalOpen, isNexusModalOpen, isEditModalOpen])


    // get json from webster dicionary api
    const getWebsterWordDetail = async () => {
        let endpoint = DICT_API_URL
        // replace ? with "word?"
        endpoint = endpoint.replace('?', `${node.word}` + '?')
        const response = await axios.get(endpoint)
            .then(response => {
                if (response.data[0]?.shortdef?.length > 0) {
                    setShortDefs(response.data[0]?.shortdef)
                }
            })
            .catch(err => console.log(err))
    }

    const toggleDefinition = () => {
        setShowMeaning(!showMeaning)
        getWebsterWordDetail()
    }


    const openDefModal = () => {
        setIsNexusModalOpen(false)
        setShowMeaning(false)
        setIsDefModalOpen(true)
    }

    const closeDefModal = () => {
        setIsDefModalOpen(false)
        setShortDefs([])
    }


    const openNexusModal = () => {
        setShowMeaning(false)
        // setIsDefModalOpen(false)
        setIsNexusModalOpen(true)
    }

    const closeNexusModal = () => {
        setIsNexusModalOpen(false)
    }


    const openEditModal = () => {
        setShowMeaning(false)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
    }

    const content = (
        <div className='content-wrapper'>
            <div className="container">
                {/* inbound nodes and nexus */}
                <div className="left grid-item">
                    <InBound nexusWithNodes={nexusWithNodes} />
                </div>

                {/* center node, node of interest */}
                <div className="center">
                    <CenterNode
                        node={node}
                        toggleDefinition={toggleDefinition}
                        openDefModal={openDefModal}
                        openNexusModal={openNexusModal}
                        openEditModal={openEditModal}
                    />
                    {/* definition div, can be toggled to be displayed or hidden */}
                    <div className={showMeaning ? 'show' : 'hidden'}>
                        {node?.meanings?.length !== 0 ?
                            node?.meanings?.map(meaning => {
                                return <p key={nanoid()}>
                                    <span key={nanoid()}>
                                        Def. {node.meanings?.indexOf(meaning) + 1}:<br />
                                    </span>{meaning.partOfSpeech}: {meaning.definition} <br />
                                    {meaning.sentence && < span className='example' key={nanoid()}>e.g. "{meaning.sentence}"</span>}
                                </p>
                            })
                            : <p>
                                No customized definition added yet
                            </p>
                        }
                    </div>
                    {/* webster api data displayer here */}
                    <div className={showMeaning ? 'show' : 'hidden'}>
                        <h3>Webster Definitions:</h3>
                        {shortDefs?.length !== 0 ?
                            shortDefs?.map(def => {
                                return <p key={nanoid()}>
                                    <span key={nanoid()}>
                                        Def. {shortDefs.indexOf(def) + 1}:<br />
                                    </span>{def}. <br />
                                </p>
                            })
                            : <p>
                                No short definition available, check spellling of the word.
                            </p>
                        }
                    </div>
                    {/* AddDefModal */}
                    {isDefModalOpen && <AddDefinitionModal nodeId={id} closeDefModal={closeDefModal} />}
                    {isNexusModalOpen && <AddNexusModal nodeId={id} closeNexusModal={closeNexusModal} />}
                    {isEditModalOpen && <EditNodeModal nodeId={id} closeEditModal={closeEditModal} />}
                </div>

                {/* outbound nexus and nodes */}
                <div className="right">
                    <Outbound nexusWithNodes={nexusWithNodes} />
                </div>
            </div>
        </div>
    )


    return (
        content
    )
}

export default NodeWithNexus