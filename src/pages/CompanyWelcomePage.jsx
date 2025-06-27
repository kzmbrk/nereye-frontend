import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import '../css/CompanyWelcomePage.css';
import CompanyNavbar from './CompanyNavbar';

function CompanyWelcomePage() {
    const location = useLocation();
    const { company } = location.state || {};

    const formRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        from_city: '',
        to_city: '',
        departure_time: '',
        arrival_time: '',
        price: '',
        vehicleId: ''
    });

    const companyId = localStorage.getItem('companyId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const authenticateCompany = async () => {
            try {
                const response = await axios.post('http://localhost:8081/authenticate', {
                    email: 'kazim.barik06@hotmail.com',
                    password: '1'
                });

                const token = response.data.token;
                if (token) {
                    localStorage.setItem('token', token);
                } else {
                    console.error('Authentication failed: token missing.');
                }
            } catch (err) {
                console.error('Authentication error:', err);
            }
        };

        if (!token) {
            authenticateCompany();
        }
    }, [token]);

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!companyId || !token) return;

            try {
                const response = await axios.get(`http://localhost:8081/api/vehicle/company/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVehicles(response.data);
            } catch (error) {
                console.error("Araçları alırken hata oluştu:", error);
            }
        };

        fetchVehicles();
    }, [companyId, token]);

    if (!company) {
        return <div>Şirket bilgisi bulunamadı.</div>;
    }

    const handleCreateTravelClick = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDepartureTime = dayjs(formData.departure_time).format('YYYY-MM-DDTHH:mm:ss');
            const formattedArrivalTime = dayjs(formData.arrival_time).format('YYYY-MM-DDTHH:mm:ss');

            const payload = {
                fromCity: formData.from_city,
                toCity: formData.to_city,
                departureTime: formattedDepartureTime,
                arrivalTime: formattedArrivalTime,
                price: formData.price,
                companyId: companyId,
                vehicleId: formData.vehicleId
            };

            const response = await axios.post('http://localhost:8081/api/travel/save', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Seyahat başarıyla kaydedildi!');
            setShowForm(false);
            setFormData({
                from_city: '',
                to_city: '',
                departure_time: '',
                arrival_time: '',
                price: '',
                vehicleId: ''
            });

        } catch (error) {
            console.error('Seyahat oluşturulurken hata oluştu:', error);
            alert('Bir hata oluştu.');
        }
    };

    return (
        <div className="company-welcome-container">
            <header className="header">
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                    <h1>Nereye</h1>
                </Link>
            </header>
            <h2>Hoşgeldiniz {company.name}!</h2>
            <h2>Seyahat Oluşturmak İçin Devam Edin</h2>

            {!showForm && (
                <button className="createTravel-btn" onClick={handleCreateTravelClick}>
                    Seyahat Oluştur
                </button>
            )}

            {showForm && (
                <div ref={formRef} className="travel-form-container">
                    <form className="travel-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="from_city"
                            placeholder="Nereden"
                            value={formData.from_city}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="to_city"
                            placeholder="Nereye"
                            value={formData.to_city}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="datetime-local"
                            name="departure_time"
                            value={formData.departure_time}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="datetime-local"
                            name="arrival_time"
                            value={formData.arrival_time}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Fiyat"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Araç Seçiniz</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.description}
                                </option>
                            ))}
                        </select>
                        <div>
                            <button className="createTravel-btn" type="submit">Onayla</button>
                        </div>
                        <div>
                            <button className="createTravel-btn" type="button" onClick={closeForm}>İptal</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex' }}>
                <CompanyNavbar />
                <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default CompanyWelcomePage;
