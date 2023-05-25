import React from 'react'
import SatNode from './SatNode'
import SatNexus from './SatNexus'
import { nanoid } from 'nanoid'

const InBound = ({ nexusWithNodes }) => {
    const inbounds = nexusWithNodes.inbound
    return (
        inbounds?.length > 0 ?
            <div>
                {inbounds.map(inbound => {
                    return <div key={nanoid()}>
                        <SatNode inbound={inbound} />
                        <SatNexus nexus={inbound} />
                    </div>
                })}
            </div> :
            <h4>No inbound nexus yet</h4>
    )
}

export default InBound