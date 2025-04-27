import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/CompanyPage.css';

function CompanyPage() {
    const [showInputs, setShowInputs] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyData, setCompanyData] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/company/getCompany${id}`);
            if (response.data.name === companyName) {
                setCompanyData(response.data);
            } else {
                setError('Şirket adı ve ID eşleşmiyor.');
            }
        } catch (error) {
            setError('Şirket bulunamadı.');
        }
    };

    return (
        <div>
            <header className="header">
                <Link style={{ color: 'white' }} to="/" >
                    <h2>Nereye</h2>
                </Link>
            </header>

            <div className="company-container">
                {!showInputs ? (
                    <button
                        className="login-btn"
                        onClick={() => setShowInputs(true)}
                    >
                        Giriş
                    </button>
                ) : (
                    <div>
                        <div>
                            <input
                                type="text"
                                placeholder="Şirket Adı"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Şirket ID"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="login-btn"
                                onClick={handleLogin}
                            >
                                Giriş Yap
                            </button>
                        </div>
                        {error && <p style={{ color: 'white' }}>{error}</p>}
                    </div>
                )}

                {companyData && (
                    <div className="company-info">
                        <h3>Hoşgeldiniz</h3>
                        <p>Şirket Adı: {companyData.name}</p>
                        <p>Şirket Türü: {companyData.companyType}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanyPage;
