import React, { useEffect, useState } from 'react';

const DebitCardsList = ({ userId }) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/debitCards/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Kartlar alınamadı');
                }
                const data = await response.json();
                setCards(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [userId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ margin: '20px auto', maxWidth: '600px' }}>
            <h2>Kayıtlı Kartlar</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#2193b0', color: 'white' }}>
                        <th style={thStyle}>Kart Numarası</th>
                        <th style={thStyle}>Açıklama</th>
                        <th style={thStyle}>Son Kullanma</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            <td style={tdStyle}>{card.cardNumber}</td>
                            <td style={tdStyle}>{card.description}</td>
                            <td style={tdStyle}>{card.expiryDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const thStyle = {
    padding: '10px',
    borderBottom: '2px solid #ccc'
};

const tdStyle = {
    padding: '10px',
};

export default DebitCardsList;
