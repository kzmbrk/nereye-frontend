import React from 'react'
import { Link } from 'react-router-dom';

function TravelPage() {
    return (
        <div>
            <div>
                <header className="header">
                    <Link style={{ color: 'white' }} to="/" >
                        <h1>Nereye</h1>
                    </Link>
                </header>
            </div>
        </div>
    )
}

export default TravelPage