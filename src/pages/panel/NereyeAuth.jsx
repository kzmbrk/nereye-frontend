import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/panelCss/NereyeAuth.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NereyeAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const backendUrl = 'http://localhost:8081';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${backendUrl}/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Giriş başarısız');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            toast.success('Yönetici girişi başarılı!');


            // Kısa süre sonra yönlendirme yapabiliriz
            setTimeout(() => {
                navigate('/panel/dashboard');
            }, 1500);  // 1.5 saniye bekle sonra yönlendir
        } catch (err) {
            setError(err.message || 'Bilinmeyen bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nereye-auth-page">
            <ToastContainer />  {/* BURAYI EKLEMELİSİN */}
            <div className="auth-box">
                <h2>Yönetici Girişi</h2>
                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default NereyeAuth;
