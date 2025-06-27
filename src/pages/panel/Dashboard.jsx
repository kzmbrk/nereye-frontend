import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/panelCss/Dashboard.css';

function Dashboard() {
    const [stats, setStats] = useState({
        companyCount: 0,
        travelCount: 0,
        ticketCount: 0,
        popularRoute: ''
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/dashboard/summary', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setStats(response.data);
            } catch (err) {
                console.error('Dashboard verileri alınamadı:', err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-container" style={{ padding: '20px' }}>
            <h2>Yönetim Paneli</h2>
            <div className="dashboard-cards" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="dashboard-card">Şirket Sayısı: {stats.companyCount}</div>
                <div className="dashboard-card">Seyahat Sayısı: {stats.travelCount}</div>
                <div className="dashboard-card">Bilet Sayısı: {stats.ticketCount}</div>
                <div className="dashboard-card">Popüler Güzergah: {stats.popularRoute}</div>
            </div>

        </div>
    );
}

export default Dashboard;
