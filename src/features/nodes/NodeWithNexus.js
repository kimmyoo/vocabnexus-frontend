import React from 'react'
import CenterNode from '../../component/CenterNode'
import SatNode from '../../component/SatNode'
import SatNexus from '../../component/SatNexus'

const NodeWithNexus = () => {
    return (
        <>
            <div className="container">
                <div className="left">
                    <SatNode />
                    <SatNexus />
                </div>
                <div className="center">
                    <h1>Current Node</h1>
                    <h2>liked   grasped</h2>
                    <CenterNode />
                </div>
                <div class="right">
                    <SatNexus />
                    <SatNode />
                </div>
            </div>
        </>
    )
}

export default NodeWithNexus