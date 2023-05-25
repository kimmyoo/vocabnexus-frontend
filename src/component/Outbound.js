import React from 'react'
import SatNexus from './SatNexus'
import SatNode from './SatNode'
import { nanoid } from 'nanoid'

const Outbound = ({ nexusWithNodes }) => {
    const outbounds = nexusWithNodes.outbound
    return (
        outbounds?.length > 0 ?
            <div>
                {outbounds.map(outbound => {
                    return <div key={nanoid()}>
                        <SatNexus nexus={outbound} />
                        <SatNode outbound={outbound} />
                    </div>
                })}
            </div> :
            <h4>No outbound nexus yet</h4>
    )
}

export default Outbound