import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../css/Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={isOpen ? "menu active" : "menu"}>
                <li><Link to="/" onClick={toggleMenu}>Anasayfa</Link></li>
                <li><Link to="/home" onClick={toggleMenu}>Seyahat</Link></li>
                <li><Link to="/travel" onClick={toggleMenu}>Seyahat Ara</Link></li>
                <li><Link to="/company" onClick={toggleMenu}>Şirket</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
