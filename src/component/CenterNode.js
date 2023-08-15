import React from 'react'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'


const CenterNode = ({
    node,
    toggleDefinition,
    openDefModal,
    openNexusModal,
    openEditModal
}) => {
    const axiosPrivate = useAxiosPrivate()
    const [centerNode, setCenterNode] = useState(node)

    useEffect(() => {
        setCenterNode(node)
    }, [node])


    const toggleLiked = async () => {
        if (centerNode) {
            const liked = !centerNode.liked
            try {
                await axiosPrivate.patch('nodes/liked', { id: centerNode._id, liked: liked })
            } catch (err) {
                console.error(err)
            }

            setCenterNode({
                ...centerNode,
                "liked": !centerNode.liked
            })
        }
    }

    const toggleGrasped = async () => {
        if (centerNode) {
            const grasped = !centerNode.grasped
            try {
                await axiosPrivate.patch('nodes/grasped', { id: centerNode._id, grasped: grasped })
            } catch (err) {
                console.error(err)
            }

            setCenterNode({
                ...centerNode,
                "grasped": !centerNode.grasped
            })
        }
    }


    return (
        <div className="node">
            <div className="top">
                <button onClick={toggleDefinition}>toggle definition</button> <br />
                <div>
                    <button onClick={toggleLiked}>{centerNode?.liked ? "💗" : "🤍"}</button>
                    <button onClick={toggleGrasped}>{centerNode?.grasped ? "😁" : "😵‍💫"}</button>
                </div>
            </div>
            <div className="middle">{node ? node.word : "VocabNexus 词汇链接 🔗"}</div>
            <div className="bottom">
                <button onClick={openNexusModal}>Add Nexus</button>
                <button onClick={openEditModal}>Edit Mode</button>
                <br />
                <button onClick={openDefModal}>Add Definition</button>
            </div>
        </div>
    )
}

export default CenterNode