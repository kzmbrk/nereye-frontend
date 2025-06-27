import React, { useState } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import '../css/CompanyVehiclesCreate.css';


function CompanyVehiclesCreate() {
    const [formData, setFormData] = useState({
        type: 'BUS',
        capacity: '',
        description: '',
        features: ''
    });
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const companyId = localStorage.getItem('companyId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                capacity: parseInt(formData.capacity, 10),
                companyId: companyId
            };

            const response = await axios.post('http://localhost:8081/api/vehicle/save', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Araç başarıyla kaydedildi.');
            setFormData({
                type: 'BUS',
                capacity: '',
                description: '',
                features: ''
            });
        } catch (err) {
            console.error(err);
            setMessage('Bir hata oluştu. Araç kaydedilemedi.');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <CompanyNavbar />
            <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                <div className="vehicle-create-container">
                    <h2>Araç Oluştur</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Araç Tipi:</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="BUS">Otobüs</option>
                            <option value="TRAIN">Tren</option>
                            <option value="AIRLINE">Uçak</option>
                        </select>

                        <label>Kapasite:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />

                        <label>Açıklama:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <label>Özellikler:</label>
                        <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            rows={4}
                            required
                        />

                        <button type="submit">Kaydet</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );

}

export default CompanyVehiclesCreate;
