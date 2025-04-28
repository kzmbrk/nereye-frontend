import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TravelPage from './pages/TravelPage';
import CompanyPage from './pages/CompanyPage';
import CompanyWelcomePage from './pages/CompanyWelcomePage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/companyWelcome" element={<CompanyWelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
