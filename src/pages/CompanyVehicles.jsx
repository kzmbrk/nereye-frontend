import React, { useEffect, useState } from 'react';
import CompanyNavbar from './CompanyNavbar';
import axios from 'axios';
import '../css/CompanyVehicles.css'; // Bu CSS'i birazdan vereceğim

function CompanyVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const companyId = localStorage.getItem('companyId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/vehicle/company/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVehicles(response.data);
            } catch (err) {
                setError('Araçlar yüklenemedi.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [companyId, token]);

    return (
        <div style={{ display: 'flex' }}>
            <CompanyNavbar />
            <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                <h2>Şirkete Ait Araçlar</h2>
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : vehicles.length === 0 ? (
                    <p>Hiç araç bulunamadı.</p>
                ) : (
                    <div className="vehicle-list">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="vehicle-card">
                                <h3>{vehicle.description}</h3>
                                <p><strong>Tip:</strong> {vehicle.type}</p>
                                <p><strong>Kapasite:</strong> {vehicle.capacity}</p>
                                <p><strong>ID:</strong> {vehicle.id}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanyVehicles;
