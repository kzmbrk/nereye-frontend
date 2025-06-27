import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar" ref={menuRef}>
            <div className="menu-icon" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`menu ${menuOpen ? 'active' : ''}`}>
                <li><Link to="/travel" onClick={toggleMenu}>Seyahatlerim</Link></li>
                <li><Link to="/home" onClick={toggleMenu}>Seyahat Ara</Link></li>
                <li><Link to="/cards" onClick={toggleMenu}>Kartlarım</Link></li>
                <li><Link to="/" onClick={toggleMenu}>Çıkış Yap</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
