import React, { useEffect, useState } from 'react';
import '../css/DebitCardsPage.css';

import cardBg from '../assets/images/card.png';
import amexLogo from '../assets/images/CardLogos/amex.svg';
import maestroLogo from '../assets/images/CardLogos/maestro.svg';
import mastercardLogo from '../assets/images/CardLogos/mastercard.svg';
import troyLogo from '../assets/images/CardLogos/troy.svg';
import visaLogo from '../assets/images/CardLogos/visa.svg';

const getCardLogo = (cardNumber) => {
    if (!cardNumber) return null;
    const firstDigit = cardNumber.trim()[0];
    switch (firstDigit) {
        case '3': return amexLogo;
        case '4': return visaLogo;
        case '5': return mastercardLogo;
        case '6': return maestroLogo;
        case '9': return troyLogo;
        default: return null;
    }
};

const DebitCardsPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCards = async () => {
            if (!userId || !token) {
                setError('Giriş yapılmamış.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8081/api/debitCards/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Kartlar alınamadı.');
                const data = await response.json();
                setCards(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [userId, token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Bu kartı silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch('http://localhost:8081/api/debitCards/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) throw new Error('Kart silinemedi.');

            setCards(prev => prev.filter(card => card.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    const handleAddCard = async (e) => {
        e.preventDefault();

        const newCard = {
            cardNumber,
            description,
            expiryDate,
            appUsers: {
                id: userId
            }
        };

        try {
            const response = await fetch('http://localhost:8081/api/debitCards/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCard)
            });

            if (!response.ok) throw new Error('Kart kaydedilemedi.');

            const savedCard = await response.json();
            setCards(prev => [...prev, savedCard]);

            // Temizle ve formu kapat
            setCardNumber('');
            setDescription('');
            setExpiryDate('');
            setShowForm(false);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>Hata: {error}</p>;

    return (
        <div className="cards-container">
            <h2>Kartlarım</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Formu Kapat' : 'Kart Ekle'}
            </button>

            {showForm && (
                <form className="add-card-form" onSubmit={handleAddCard}>
                    <input
                        type="text"
                        placeholder="Kart Numarası"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Açıklama"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="month"
                        placeholder="Son Kullanma Tarihi"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                    <button type="submit">Kaydet</button>
                </form>
            )}

            <div className="card-list">
                {cards.map(card => {
                    const logo = getCardLogo(card.cardNumber);
                    return (
                        <div key={card.id} className="card-row">
                            <div className="card-wrapper">
                                <img src={cardBg} alt="Card Background" className="card-bg" />
                                {logo && <img src={logo} alt="Card Logo" className="card-logo" />}
                                <div className="card-description">{card.description}</div>
                                <div className="card-number">{card.cardNumber}</div>
                                <div className="card-expiry">Son Kullanma Tarihi: {card.expiryDate}</div>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(card.id)}
                            >
                                Kartı Sil
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DebitCardsPage;
