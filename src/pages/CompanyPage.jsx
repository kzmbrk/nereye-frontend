import React from 'react'
import { Link } from 'react-router-dom';

function CompanyPage() {
    return (
        <div>
            <header className="header">
                <Link style={{ color: 'white' }} to="/" >
                    <h2>Nereye</h2>
                </Link>
            </header>
        </div>
    )
}

export default CompanyPage