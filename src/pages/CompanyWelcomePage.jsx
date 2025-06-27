import React, { useState, useRef } from 'react';
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
    const [formData, setFormData] = useState({
        company_id: '',
        from_city: '',
        to_city: '',
        departure_time: '',
        arrival_time: '',
        price: '',
    });

    if (!company) {
        return <div>Şirket bilgisi bulunamadı.</div>;
    }

    const handleCreateTravelClick = () => {
        setShowForm(true); // <<<<< Formu görünür yap
        setTimeout(() => {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Biraz gecikmeli kaydır
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const closeForm = () => {
        setShowForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDepartureTime = formData.departure_time
                ? dayjs(formData.departure_time).format('YYYY-MM-DDTHH:mm:ss')
                : '1970-01-01T00:00:00';

            const formattedArrivalTime = formData.arrival_time
                ? dayjs(formData.arrival_time).format('YYYY-MM-DDTHH:mm:ss')
                : '1970-01-01T00:00:00';

            const payload = {
                fromCity: formData.from_city,
                toCity: formData.to_city,
                departureTime: formattedDepartureTime,
                arrivalTime: formattedArrivalTime,
                price: formData.price,
                companyId: formData.company_id,
            };

            console.log("Gönderilecek Payload: ", payload);

            const response = await axios.post('http://localhost:8081/api/travel/save', payload);
            console.log('Başarılı:', response.data);
            alert('Seyahat başarıyla kaydedildi!');

            // Form gönderildikten sonra:
            setShowForm(false); // <<<<< Formu gizle
            setFormData({       // <<<<< Formu sıfırla
                company_id: '',
                from_city: '',
                to_city: '',
                departure_time: '',
                arrival_time: '',
                price: '',
            });

        } catch (error) {
            console.error('Hata:', error);
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
            <h1>Hoşgeldiniz {company.name}!</h1>

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
                            placeholder="Kalkış Zamanı"
                            value={formData.departure_time}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="datetime-local"
                            name="arrival_time"
                            placeholder="Varış Zamanı"
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
                        <div>
                            <button className="createTravel-btn" type="submit">Onayla</button>
                        </div>
                        <div>
                            <button className="createTravel-btn" onClick={closeForm}>İptal</button>
                        </div>
                    </form>
                </div>
            )}
            <button className="createTravel-btn" >Seyahatleri Görüntüle / Düzenle</button>
            <div>
            </div>
            <div style={{ display: 'flex' }}>
                <CompanyNavbar />
                <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                    <h1>Şirket Ana Sayfası</h1>
                    {/* Diğer içerikler */}
                </div>
            </div>

        </div>

    );
}

export default CompanyWelcomePage;
