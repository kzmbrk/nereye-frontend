import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CompanyPage.css';


function CompanyPage() {
    const [showInputs, setShowInputs] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyData, setCompanyData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/company/getCompany/${companyId}`);

            if (response.data.name.toLowerCase() === companyName.toLowerCase()) {
                localStorage.setItem('companyId', companyId);
                navigate('/companyWelcome', { state: { company: response.data } });
            } else {
                setError('Şirket adı ve ID eşleşmiyor.');
                console.log("Gelen Cevap: " + response.data.name + " Gelen Cevap: " + response.data.companyType)
            }
        } catch (error) {
            setError('Şirket bulunamadı.');
            console.log(error.message)
        }
    };

    return (
        <div>
            <header className="header">
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/" >
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
                                type="number"
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
            </div>
        </div>
    );
}

export default CompanyPage;
