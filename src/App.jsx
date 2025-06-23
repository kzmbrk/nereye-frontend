import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TravelPage from './pages/TravelPage';
import CompanyPage from './pages/CompanyPage';
import CompanyWelcomePage from './pages/CompanyWelcomePage';
import CompanyCreate from './pages/CompanyCreate';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar';
import DebitCardsPage from './pages/DebitCardsPage';
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
        <Route path="/company-create" element={<CompanyCreate />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cards" element={<DebitCardsPage />} />

      </Routes>
    </Router>
  );
};

export default App;
