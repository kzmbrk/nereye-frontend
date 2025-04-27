import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav className="navbar" ref={menuRef}>
            <div className="menu-icon" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`menu ${menuOpen ? 'active' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Anasayfa</Link></li>
                <li><Link to="/travel" onClick={toggleMenu}>Seyahat</Link></li>
                <li><Link to="/home" onClick={toggleMenu}>Seyahat Ara</Link></li>
                <li><Link to="/company" onClick={toggleMenu}>Şirket</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
