import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axios.post(`http://localhost:8081/forgot-password?email=${encodeURIComponent(email)}`);
            setMessage(response.data.message || 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        } catch (err) {
            setError(err.response?.data?.message || 'Bir hata oluştu.');
        }
    };

    return (
        <div className="forgot-password-page">
            <h2>Şifremi Unuttum</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Sıfırlama Linki Gönder</button>
                {message && <p className="success-text">{message}</p>}
                {error && <p style={{ color: 'black' }} className="error-text">{error}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
