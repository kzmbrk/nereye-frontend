import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/panelCss/NereyeNavbar.css';

const NereyeNavbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Anasayfa', path: '/panel/dashboard' },
        { name: 'Şirketler', path: '/panel/company' },
        { name: 'Kara Liste', path: '/panel/blacklist' },
        { name: 'Kullanıcılar', path: '/panel/users' },
        { name: 'Onay Bekleyen Seyahatler', path: '/panel/travel' },

    ];

    return (
        <nav className="nereye-navbar">
            <ul>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NereyeNavbar;
