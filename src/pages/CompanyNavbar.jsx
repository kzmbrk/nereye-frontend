// src/components/CompanyNavbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../src/css/companyNavbar.css'; // CSS dosyasını burada tutabilirsin

const CompanyNavbar = () => {
    const location = useLocation();

    return (
        <div className="company-navbar">
            <h2 className="company-navbar-title">Şirket Paneli</h2>
            <nav>
                <ul>
                    <li className={location.pathname === '/companyWelcome' ? 'active' : ''}>
                        <Link to="/companyWelcome">Ana Sayfa</Link>
                    </li>
                    <li className={location.pathname === '/companyTravels' ? 'active' : ''}>
                        <Link to="/companyTravels">Seyahatler</Link>
                    </li>
                    <li className={location.pathname === '/companyVehicles' ? 'active' : ''}>
                        <Link to="/companyVehicles">Araçlar</Link>
                    </li>
                    <li className={location.pathname === '/companyVehiclesCreate' ? 'active' : ''}>
                        <Link to="/companyVehiclesCreate">Araç Ekle</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default CompanyNavbar;
