import React from 'react'
import { Link } from 'react-router-dom'

const SatNode = (props) => {
    const { inbound, outbound } = props

    let nexus
    let nodeId
    let className

    if (inbound) {
        nexus = inbound
        nodeId = nexus.nodeFrom
        className = "satelliteNode inbound"
    } else {
        nexus = outbound
        nodeId = nexus.nodeTo
        className = "satelliteNode outbound"
    }


    const content = (
        <div className="node-nexus">
            <Link to={`/user-dash/nodes/detail/${nodeId}`}>
                <div className={className}>
                    <h4>
                        {nexus.word}
                    </h4>
                </div>
            </Link>
        </div>
    )



    return (
        content
    )
}

export default SatNode