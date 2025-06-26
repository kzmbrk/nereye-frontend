import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/panelCss/OnayBekleyenSeyahatler.css';  // Stil dosyasını import ettik

const OnayBekleyenSeyahatler = () => {
    const [travels, setTravels] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:8081/api/travel/inactive', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setTravels(res.data))
            .catch(() => setTravels([]));
    }, [token]);

    const handleApprove = (travelId) => {
        axios.put(
            `http://localhost:8081/api/travel/${travelId}/status`,
            null,
            {
                params: { isActive: true },
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then(() => window.location.reload());
    };

    const handleReject = (travelId) => {
        axios.delete(`http://localhost:8081/api/travel/delete/${travelId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => window.location.reload());
    };

    return (
        <div className="myContainer">
            {travels.length === 0 ? (
                <div>Onay bekleyen seyahat bulunamadı.</div>
            ) : (
                travels.map(travel => (
                    <div key={travel.id} className="travel-container">
                        <div className="travel-info">
                            <div><strong>Güzergah:</strong> {travel.fromCity} → {travel.toCity}</div>
                            <div><strong>Kalkış:</strong> {new Date(travel.departureTime).toLocaleString()}</div>
                            <div><strong>Varış:</strong> {new Date(travel.arrivalTime).toLocaleString()}</div>
                            <div><strong>Fiyat:</strong> {travel.price} ₺</div>
                        </div>
                        <button className="approve-button" onClick={() => handleApprove(travel.id)}>Onayla</button>
                        <button className="reject-button" onClick={() => handleReject(travel.id)}>Reddet</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default OnayBekleyenSeyahatler;
