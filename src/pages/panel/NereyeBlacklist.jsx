import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NereyeBlacklist() {
    const [whitelistedCompanies, setWhitelistedCompanies] = useState([]);

    useEffect(() => {
        const fetchWhitelistedCompanies = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8081/api/companyStatus/blacklisted', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Kara listedeki şirketler getirilemedi.');
                }

                const data = await response.json();
                setWhitelistedCompanies(data);
            } catch (error) {
                console.error('İstek hatası:', error);
                toast.error('Kara listedeki şirketler alınırken hata oluştu.');
            }
        };

        fetchWhitelistedCompanies();
    }, []);

    return (
        <div style={{ padding: '40px', color: 'white' }}>
            <h2 style={{ marginBottom: '20px' }}>Kara Listedeki Şirketler</h2>

            {whitelistedCompanies.length === 0 ? (
                <p>Listelenecek şirket bulunamadı.</p>
            ) : (
                whitelistedCompanies.map((company, idx) => (
                    <div
                        key={idx}
                        style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            marginBottom: '20px',
                            position: 'relative',
                            width: '80%',
                            minWidth: '800px'
                        }}
                    >
                        <p><strong>Şirket Adı:</strong> {company.companyName}</p>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Telefon:</strong> {company.phoneNumber}</p>
                        <p><strong>Firma Tipi:</strong> {company.companyType}</p>

                        <button
                            style={{
                                position: 'absolute',
                                right: '20px',
                                bottom: '20px',
                                padding: '8px 14px',
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                // Buraya sonra kara listeden çıkarma fonksiyonu eklenecek
                                console.log('Kara listeden çıkarılacak ID:', company.id);
                            }}
                        >
                            Kara Listeden Çıkar
                        </button>
                    </div>
                ))
            )}

            <ToastContainer />
        </div>
    );
}

export default NereyeBlacklist;
