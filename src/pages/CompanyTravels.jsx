import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import '../css/CompanyTravels.css';

function CompanyTravels() {
    const [travels, setTravels] = useState([]);
    const [error, setError] = useState('');
    const companyId = localStorage.getItem('companyId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/travel/company/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTravels(response.data);
            } catch (err) {
                console.error(err);
                setError("Seyahatler yüklenirken bir hata oluştu.");
            }
        };
        fetchTravels();
    }, [companyId, token]);

    return (
        <div style={{ display: 'flex' }}>
            <CompanyNavbar />
            <div className="travel-list-container">
                <h2>Şirketin Seyahatleri</h2>
                {error && <p className="error">{error}</p>}
                {travels.length === 0 && !error ? (
                    <p>Henüz bir seyahat oluşturulmamış.</p>
                ) : (
                    travels.map(travel => (
                        <div key={travel.id} className="travel-card">
                            <h3>{travel.fromCity} ➔ {travel.toCity}</h3>
                            <p><strong>Kalkış:</strong> {new Date(travel.departureTime).toLocaleString()}</p>
                            <p><strong>Varış:</strong> {new Date(travel.arrivalTime).toLocaleString()}</p>
                            <p><strong>Fiyat:</strong> {travel.price} ₺</p>
                            <p><strong>Araç Açıklaması:</strong> {travel.vehicles.description}</p>
                            <p><strong>Özellikler:</strong> {travel.vehicles.features}</p>
                            <p><strong>Kapasite:</strong> {travel.vehicles.capacity}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CompanyTravels;
