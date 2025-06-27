import React, { useState } from 'react';
import '../css/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(true); // true = erkek, false = kadın

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

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errData = await response.json();
                    throw new Error(errData.message || 'Giriş başarısız');
                } else {
                    throw new Error('Giriş başarısız.');
                }
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            alert('Giriş başarılı!');
            window.location.href = 'http://localhost:5173/home';
        } catch (err) {
            setError(err.message || 'Bilinmeyen bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${backendUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    gender, // ✅ erkek = true, kadın = false
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Kayıt başarısız');
            }

            const data = await response.json();
            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            setIsRegister(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setGender(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <h2>Nereye</h2>
            </header>
            <div className="login-container">
                <div className="switch-box">
                    <button
                        className={!isRegister ? 'active' : ''}
                        onClick={() => {
                            setIsRegister(false);
                            setError('');
                        }}
                    >
                        Giriş Yap
                    </button>
                    <button
                        className={isRegister ? 'active' : ''}
                        onClick={() => {
                            setIsRegister(true);
                            setError('');
                        }}
                    >
                        Kayıt Ol
                    </button>
                </div>

                {isRegister ? (
                    <>
                        <h3>Bir Hesap Oluşturun</h3>
                        <p>Lütfen bilgileri doldurun</p>
                        <form onSubmit={handleRegister} className="login-form">
                            <input
                                type="text"
                                placeholder="Ad"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Soyad"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
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

                            <div style={{ margin: '10px 0' }}>
                                <div className="gender-toggle">
                                    <span className={!gender ? 'inactive' : ''}>Erkek</span>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={gender}
                                            onChange={() => setGender(!gender)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className={gender ? 'inactive' : ''}>Kadın</span>
                                </div>
                            </div>

                            <button type="submit" disabled={loading}>
                                {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1>Hoşgeldiniz</h1>
                        <p>Lütfen giriş yapın</p>
                        <form onSubmit={handleLogin} className="login-form">
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
                            <p>
                                <Link to="/forgot-password" className="forgot-password-link">
                                    Şifremi Unuttum
                                </Link>
                            </p>                        </form>
                    </>
                )}
                {error && <p style={{ color: 'black' }}>{error}</p>}
            </div>
            <footer className="footer">
                <p>© 2025 Nereye. Tüm hakları saklıdır.</p>
                <p
                    className="link-text"
                    onClick={() => navigate('/company-create')}
                >
                    Bizimle Çalışmak İster misiniz?
                </p>
            </footer>
        </div>
    );
};

export default LoginPage;
