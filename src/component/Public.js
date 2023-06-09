import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <div className=''>
            <h4>Vocab Nexus</h4>
            <div className="node">
                <div className="top">
                    <button>toggle definition</button>
                    <div>
                        <button type='button'>💗</button>
                        <button type='button'>😁</button>
                    </div>
                </div>
                <div className="middle">VocabNexus词汇链接🔗</div>
                <div className="bottom">
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                    <br />
                    <Link to="/about"><button>About</button></Link>
                </div>
            </div>
        </div>
    )
    return (
        content
    )
}

export default Public