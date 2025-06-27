import React, { useEffect, useState } from 'react';
import '../css/travelpage.css';

const TravelPage = () => {
    const [tickets, setTickets] = useState([]);
    const [travels, setTravels] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId || !token) {
            setError('Giriş yapılmamış veya kullanıcı bulunamadı.');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // 1. Biletleri getir
                const ticketRes = await fetch(`http://localhost:8081/api/ticket/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!ticketRes.ok) throw new Error('Biletler alınamadı');
                const ticketsData = await ticketRes.json();
                setTickets(ticketsData);

                // 2. Travel ID’leri çıkar (benzersiz ve null olmayanlar)
                const travelIds = [...new Set(ticketsData.map(t => t.travellId).filter(Boolean))];

                // 3. Her travel ID için bilgi getir
                const travelPromises = travelIds.map(id =>
                    fetch(`http://localhost:8081/api/travel/getAll/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then(res => {
                        if (!res.ok) throw new Error(`Seyahat bilgisi alınamadı: ${id}`);
                        return res.json();
                    })
                );

                const travelDataArr = await Promise.all(travelPromises);

                const travelMap = {};
                travelDataArr.forEach(travel => {
                    travelMap[travel.id] = travel;
                });

                setTravels(travelMap);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, userId]);

    const handleCancel = async (ticketId) => {
        if (!ticketId) {
            alert("Bilet ID'si geçersiz.");
            return;
        }

        if (!window.confirm('Bu bileti iptal etmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`http://localhost:8081/api/ticket/cancel/${ticketId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('İptal işlemi başarısız oldu.');

            setTickets(prev => prev.filter(t => t.id !== ticketId));
            alert('Bilet başarıyla iptal edildi.');
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const now = new Date();

    return (
        <div style={{ padding: '20px', marginTop: '1000px' }}>
            <h2>Kullanıcının Biletleri ve Seyahat Bilgileri</h2>
            {tickets.length === 0 && <p>Hiç bilet bulunamadı.</p>}

            {tickets.map((ticket, index) => {
                const travel = travels[ticket.travellId];
                const key = ticket.id ?? `${ticket.travellId}-${ticket.seat}-${index}`;
                const departureTime = travel?.departureTime ? new Date(travel.departureTime) : null;

                return (

                    <div key={key} className="ticket-container">
                        <h3 className="ticket-header">Bilet Türü: {ticket.ticketType}</h3>
                        <div className="ticket-info">
                            <p><strong>Koltuk No:</strong> {ticket.seat}</p>
                            <p><strong>Satın Alma Tarihi:</strong> {new Date(ticket.purchaseDate).toLocaleString()}</p>

                            {travel ? (
                                <>
                                    <p><strong>Başlangıç Şehri:</strong> {travel.fromCity}</p>
                                    <p><strong>Bitiş Şehri:</strong> {travel.toCity}</p>
                                    <p><strong>Kalkış:</strong> {departureTime?.toLocaleString() || 'Yok'}</p>
                                </>
                            ) : (
                                <p>Seyahat bilgisi bulunamadı.</p>
                            )}
                        </div>

                        {departureTime && departureTime > now && (
                            <button className="cancel-button" onClick={() => handleCancel(ticket.id)}>
                                İptal Et
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TravelPage;
