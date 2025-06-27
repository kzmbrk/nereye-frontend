import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const STATUS_COLORS = ['#0088FE', '#FF4C4C']; // Beyaz liste - Mavi, Kara liste - Kırmızı

function Dashboard() {
    const [stats, setStats] = useState({
        companyCount: 0,
        travelCount: 0,
        ticketCount: 0,
        popularRoute: ''
    });

    // Yeni state kara & beyaz liste sayıları için
    const [companyStatusCounts, setCompanyStatusCounts] = useState({
        whitelisted: 0,
        blacklisted: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await axios.get('http://localhost:8081/api/dashboard/summary', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        async function fetchCompanyStatus() {
            try {
                const token = localStorage.getItem('token');
                const [whiteRes, blackRes] = await Promise.all([
                    axios.get('http://localhost:8081/api/companyStatus/whitelisted', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8081/api/companyStatus/blacklisted', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setCompanyStatusCounts({
                    whitelisted: whiteRes.data?.length || 0,
                    blacklisted: blackRes.data?.length || 0
                });
            } catch (err) {
                console.error('Şirket durumları alınamadı:', err);
            }
        }

        fetchStats();
        fetchCompanyStatus();
    }, []);

    const barData = [
        { name: 'Şirketler', value: stats.companyCount },
        { name: 'Seyahatler', value: stats.travelCount },
        { name: 'Biletler', value: stats.ticketCount }
    ];

    const pieData = [
        { name: 'Şirketler', value: stats.companyCount },
        { name: 'Seyahatler', value: stats.travelCount },
        { name: 'Biletler', value: stats.ticketCount }
    ];

    const companyStatusPieData = [
        { name: 'Beyaz Liste', value: companyStatusCounts.whitelisted },
        { name: 'Kara Liste', value: companyStatusCounts.blacklisted }
    ];

    return (
        <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginTop: -350, }}>Yönetim Paneli</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
                {/* Bar Grafik */}
                <div style={{ flex: '1 1 300px', height: 250, width: 400, background: '#f5f5f5', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ textAlign: 'center' }}>Genel Durum (Bar Grafik)</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>



                {/* Kara & Beyaz Liste Pasta Grafik */}
                <div style={{ flex: '1 1 300px', height: 250, background: '#f5f5f5', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ textAlign: 'center' }}>Şirket Durumları (Kara / Beyaz Liste)</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                data={companyStatusPieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {companyStatusPieData.map((entry, index) => (
                                    <Cell key={`cell-status-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
