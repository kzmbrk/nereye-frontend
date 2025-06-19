import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/ResetPassword.css';

function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirm) {
            setError('Şifreler uyuşmuyor.');
            return;
        }

        try {
            await axios.post('/reset-password', null, {
                params: {
                    token: token,
                    newPassword: password
                }
            });
            setMessage('Şifreniz başarıyla güncellendi.');
        } catch (err) {
            setError(err.response?.data || 'Bir hata oluştu.');
        }
    };

    return (
        <div className="reset-password-page">
            <h2>Yeni Şifre Belirle</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <input
                    type="password"
                    placeholder="Yeni şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Yeni şifre (tekrar)"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <button type="submit">Şifreyi Güncelle</button>
                {message && <p className="success-text">{message}</p>}
                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
