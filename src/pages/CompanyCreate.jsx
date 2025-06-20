import React, { useState } from 'react';
import '../css/CompanyCreate.css';

const CompanyCreate = () => {
    const [name, setName] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [email, setEmail] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8081/api/company/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    taxNumber,
                    email,
                    companyType
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Şirket kaydedilemedi.');
            }

            setSuccessMessage('Nereye Ailesine Hoş Geldiniz!');
            setName('');
            setTaxNumber('');
            setEmail('');
            setCompanyType('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="company-create-page">
            <header className="header">
                <h2>Firma Oluştur</h2>
            </header>
            <div className="company-create-container">
                <form onSubmit={handleSubmit} className="company-form">
                    <input
                        type="text"
                        placeholder="Firma Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Vergi Numarası"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Şirket Tipi Seçin</option>
                        <option value="BUS">Otobüs</option>
                        <option value="AIRLINE">Havayolu</option>
                        <option value="TRAIN">Tren</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Oluşturuluyor...' : 'Başlayalım'}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                    {successMessage && <p className="success-text">{successMessage}</p>}
                </form>
            </div>
            <footer className="footer">
                <p>© 2025 Nereye. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
};

export default CompanyCreate;
