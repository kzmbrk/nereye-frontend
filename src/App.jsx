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
import DebitCardsPage from './pages/DebitCardsPage';
import Navbar from './components/Navbar';

import NereyeAuth from './pages/panel/NereyeAuth';
import Dashboard from './pages/panel/Dashboard';
import NereyeCompany from './pages/panel/NereyeCompany';
import NereyeBlacklist from './pages/panel/NereyeBlacklist';
import NereyeUsers from './pages/panel/NereyeUsers';
import PanelWrapper from './pages/panel/PanelWrapper';
import NereyeNavbar from './pages/panel/NereyeNavbar';
import OnayBekleyenSeyahatler from './pages/panel/OnayBekleyenSeyahatler';

const App = () => {
  return (
    <Router>
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


        <Route path="/auth" element={<NereyeAuth />} />
        <Route path="/panel" element={<PanelWrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="company" element={<NereyeCompany />} />
          <Route path="blacklist" element={<NereyeBlacklist />} />
          <Route path="users" element={<NereyeUsers />} />
          <Route path="travel" element={<OnayBekleyenSeyahatler />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
