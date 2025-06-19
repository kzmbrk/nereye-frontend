import React, { useState } from 'react';
import '../css/CompanyCreate.css';

const CompanyCreate = () => {
    const [name, setName] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [email, setEmail] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Burada API çağrısı yapılabilir
        setTimeout(() => {
            alert('Nereye Ailesine Hoş Geldiniz');
            setLoading(false);
            setName('');
            setTaxNumber('');
            setEmail('');
            setCompanyType('');
        }, 1500);
    };
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setPhoto(null);
            setPhotoPreview(null);
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt="Seçilen Fotoğraf"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '15px', borderRadius: '8px' }}
                        />
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Oluşturuluyor...' : 'Başlayalım'}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                </form>
            </div>
            <footer className="footer">
                <p>© 2025 Nereye. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
};

export default CompanyCreate;
