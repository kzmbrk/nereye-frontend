import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TravelPage from './pages/TravelPage';
import CompanyPage from './pages/CompanyPage';
import Navbar from './components/Navbar'; // Navbar'ı ekledik

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar'ı Routes'ın üstüne koyduk */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
