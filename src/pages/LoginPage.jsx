// src/pages/LoginPage.jsx
import React, { useState } from 'react';

import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
        // Backend API entegrasyonu burada yapılacak
    };
    console.log("saa")
    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Register Email:', email, 'Password:', password);
        // Backend API entegrasyonu burada yapılacak
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
                        onClick={() => setIsRegister(false)}
                    >
                        Giriş Yap
                    </button>
                    <button
                        className={isRegister ? 'active' : ''}
                        onClick={() => setIsRegister(true)}
                    >
                        Kayıt Ol
                    </button>
                </div>
                {isRegister ? (
                    <>
                        <h3>Bir Hesap Oluşturun</h3>
                        <p>Please fill in the details to register</p>
                        <form onSubmit={handleRegister} className="login-form">
                            <input
                                type="text"
                                placeholder="Ad"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Soyad"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Kayıt Ol</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1>Hoşgeldiniz</h1>
                        <p>Please login to continue</p>
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Giriş Yap</button>
                        </form>
                    </>
                )}
            </div>
            <footer className="footer">
                <p>© 2025 Nereye. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );

};

export default LoginPage;