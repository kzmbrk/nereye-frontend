import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import '../css/CompanyWelcomePage.css';

function CompanyWelcomePage() {
    const location = useLocation();
    const { company } = location.state || {};

    const formRef = useRef(null);
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
        formRef.current.scrollIntoView({ behavior: 'smooth' });
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
            // Zamanları formatlamak
            const formattedDepartureTime = formData.departure_time ? dayjs(formData.departure_time).format('YYYY-MM-DDTHH:mm:ss') : '1970-01-01T00:00:00';
            const formattedArrivalTime = formData.arrival_time ? dayjs(formData.arrival_time).format('YYYY-MM-DDTHH:mm:ss') : '1970-01-01T00:00:00';


            // Veritabanındaki sütun isimlerine uyacak şekilde anahtarları eşliyoruz
            const payload = {
                fromCity: formData.from_city,  // from_city -> fromCity
                toCity: formData.to_city,      // to_city -> toCity
                departureTime: formattedDepartureTime, // departure_time -> departureTime
                arrivalTime: formattedArrivalTime, // arrival_time -> arrivalTime
                price: formData.price,
                companyId: formData.company_id,    // company_id -> companyId
            };

            console.log("Gönderilecek Payload: ", payload);

            // API'ye POST isteği gönderme
            const response = await axios.post('http://localhost:8081/api/travel/save', payload);
            console.log('Başarılı:', response.data);
            alert('Seyahat başarıyla kaydedildi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu.');
        }
    };

    return (
        <div className="company-welcome-container">
            <h1>Hoşgeldiniz {company.name}!</h1>
            <button className="createTravel-btn" onClick={handleCreateTravelClick}>
                Seyahat Oluştur
            </button>

            <div ref={formRef} className="travel-form-container">
                <form className="travel-form" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="company_id"
                        placeholder="Company_id"
                        value={formData.company_id}
                        onChange={handleChange}
                        required
                    />
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
                    <button className="createTravel-btn" type="submit">Onayla</button>
                </form>
            </div>
        </div>
    );
}

export default CompanyWelcomePage;
