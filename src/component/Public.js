import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <div className='content-wrapper'>
            <h1>Vocab Nexus</h1>
            <div className="node">
                <div className="top">
                    <button>toggle definition</button>
                    <div>
                        <button>💗</button>
                        <button >😁</button>
                    </div>
                </div>
                <div className="middle">VocabNexus词汇链接🔗</div>
                <div className="bottom">
                    <Link to="/login"><button>Login</button></Link>
                    <Link><button>Register</button></Link>
                    <br />
                    <Link><button>About</button></Link>
                </div>
            </div>
        </div>
    )
    return (
        content
    )
}

export default Public