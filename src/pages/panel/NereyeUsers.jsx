import React, { useEffect, useState } from 'react';
import '../../css/panelCss/NereyeUsers.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NereyeUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8081/api/users/getAll', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Kullanıcılar alınamadı.');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
                toast.error('Kullanıcı verisi alınırken hata oluştu.');
            }
        };

        fetchUsers();
    }, []);

    const handleResetPassword = (userId) => {
        toast.info(`Şifre sıfırlama işlemi başlatılacak: ${userId}`);
        // TODO: Şifre sıfırlama endpoint'i buraya gelecek
    };

    const handleDeleteUser = (userId) => {
        toast.warn(`Kullanıcı silinecek: ${userId}`);
        // TODO: Kullanıcı silme endpoint'i buraya gelecek
    };

    return (
        <div className="users-container">
            <h2 style={{ color: '#fff', marginBottom: '24px' }}>Tüm Kullanıcılar</h2>

            {users.length === 0 ? (
                <p style={{ color: '#ccc' }}>Henüz kullanıcı yok.</p>
            ) : (
                users.map((user, idx) => (
                    <div key={idx} className="user-box">
                        <div className="user-info">
                            <p><strong>Ad:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Cinsiyet:</strong> {user.gender ? 'Erkek' : 'Kadın'}</p>
                        </div>

                        <div className="user-actions">
                            <button className="action-button reset" onClick={() => handleResetPassword(user.id)}>
                                Şifreyi Sıfırla
                            </button>
                            <button className="action-button delete" onClick={() => handleDeleteUser(user.id)}>
                                Kullanıcıyı Sil
                            </button>
                        </div>
                    </div>
                ))
            )}

            <ToastContainer />
        </div>
    );
}

export default NereyeUsers;
