import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import React, { useState, useEffect } from 'react';
import SeatSelector from './SeatSelector.jsx';


const HomePage = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState('');
    const [showSeatSelector, setShowSeatSelector] = useState(false);
    const [selectedTravelId, setSelectedTravelId] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const [connectedTrips, setConnectedTrips] = useState([]);
    const [showConnectedTripsButton, setShowConnectedTripsButton] = useState(false);



    const cities = [
        { value: 'ADANA', label: 'Adana' }, { value: 'ADIYAMAN', label: 'Adıyaman' }, { value: 'AFYONKARAHISAR', label: 'Afyonkarahisar' }, { value: 'AGRI', label: 'Ağrı' },
        { value: 'AMASYA', label: 'Amasya' }, { value: 'ANKARA', label: 'Ankara' }, { value: 'ANTALYA', label: 'Antalya' }, { value: 'ARTVIN', label: 'Artvin' },
        { value: 'AYDIN', label: 'Aydın' }, { value: 'BALIKESIR', label: 'Balıkesir' }, { value: 'BILECIK', label: 'Bilecik' }, { value: 'BINGOL', label: 'Bingöl' },
        { value: 'BITLIS', label: 'Bitlis' }, { value: 'BOLU', label: 'Bolu' }, { value: 'BURDUR', label: 'Burdur' }, { value: 'BURSA', label: 'Bursa' },
        { value: 'CANAKKALE', label: 'Çanakkale' }, { value: 'CANKIRI', label: 'Çankırı' }, { value: 'CORUM', label: 'Çorum' }, { value: 'DENIZLI', label: 'Denizli' },
        { value: 'DIYARBAKIR', label: 'Diyarbakır' }, { value: 'EDIRNE', label: 'Edirne' }, { value: 'ELAZIG', label: 'Elazığ' }, { value: 'ERZINCAN', label: 'Erzincan' },
        { value: 'ERZURUM', label: 'Erzurum' }, { value: 'ESKISEHIR', label: 'Eskişehir' }, { value: 'GAZIANTEP', label: 'Gaziantep' }, { value: 'GIRESUN', label: 'Giresun' },
        { value: 'GUMUSHANE', label: 'Gümüşhane' }, { value: 'HAKKARI', label: 'Hakkari' }, { value: 'HATAY', label: 'Hatay' }, { value: 'IGDIR', label: 'Iğdır' },
        { value: 'ISPARTA', label: 'Isparta' }, { value: 'ISTANBUL', label: 'İstanbul' }, { value: 'IZMIR', label: 'İzmir' }, { value: 'KAHRAMANMARAS', label: 'Kahramanmaraş' },
        { value: 'KARABUK', label: 'Karabük' }, { value: 'KARAMAN', label: 'Karaman' }, { value: 'KARS', label: 'Kars' }, { value: 'KASTAMONU', label: 'Kastamonu' },
        { value: 'KAYSERI', label: 'Kayseri' }, { value: 'KILIS', label: 'Kilis' }, { value: 'KIRIKKALE', label: 'Kırıkkale' }, { value: 'KIRKLARELI', label: 'Kırklareli' },
        { value: 'KIRSEHIR', label: 'Kırşehir' }, { value: 'KOCAELI', label: 'Kocaeli' }, { value: 'KONYA', label: 'Konya' }, { value: 'KUTAHYA', label: 'Kütahya' },
        { value: 'MALATYA', label: 'Malatya' }, { value: 'MANISA', label: 'Manisa' }, { value: 'MARDIN', label: 'Mardin' }, { value: 'MERSIN', label: 'Mersin' },
        { value: 'MUGLA', label: 'Muğla' }, { value: 'MUS', label: 'Muş' }, { value: 'NEVSEHIR', label: 'Nevşehir' }, { value: 'NIGDE', label: 'Niğde' },
        { value: 'ORDU', label: 'Ordu' }, { value: 'OSMANIYE', label: 'Osmaniye' }, { value: 'RIZE', label: 'Rize' }, { value: 'SAKARYA', label: 'Sakarya' },
        { value: 'SAMSUN', label: 'Samsun' }, { value: 'SANLIURFA', label: 'Şanlıurfa' }, { value: 'SIIRT', label: 'Siirt' }, { value: 'SINOP', label: 'Sinop' },
        { value: 'SIRNAK', label: 'Şırnak' }, { value: 'SIVAS', label: 'Sivas' }, { value: 'TEKIRDAG', label: 'Tekirdağ' }, { value: 'TOKAT', label: 'Tokat' },
        { value: 'TRABZON', label: 'Trabzon' }, { value: 'TUNCELI', label: 'Tunceli' }, { value: 'USAK', label: 'Uşak' }, { value: 'VAN', label: 'Van' },
        { value: 'YALOVA', label: 'Yalova' }, { value: 'YOZGAT', label: 'Yozgat' }, { value: 'ZONGULDAK', label: 'Zonguldak' }, { value: 'DUZCE', label: 'Düzce' }
    ];
    // Component mount olduğunda email ve userId al
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
            fetchUserId(storedEmail);
        }
    }, []);

    // Kullanıcı ID fetch fonksiyonu
    const fetchUserId = async (email) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:8081/api/users/getUserIdByEmail?email=${email}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Kullanıcı ID alınamadı');

            const data = await res.json();
            setUserId(data);
            localStorage.setItem('userId', data);
            console.log('Kullanıcı ID:', data);
        } catch (err) {
            console.error('Kullanıcı ID alınırken hata:', err.message);
        }
    };

    // Sayfa kapanırken token temizle
    useEffect(() => {
        const handleUnload = () => localStorage.removeItem('token');
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    // Seyahat arama fonksiyonu
    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setTrips([]);
        setConnectedTrips([]);
        setShowConnectedTripsButton(false);

        // Giriş kontrolleri
        if (!origin || !destination) {
            setError('Lütfen nereden ve nereye şehirlerini seçin.');
            return;
        }
        if (!departureDate) {
            setError('Lütfen tarih seçin.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Lütfen giriş yapınız.');
            window.location.href = 'http://localhost:5173/';
            return;
        }

        try {
            const formattedDate = `${departureDate}T00:00:00`;
            const searchParams = new URLSearchParams({
                fromCity: origin,
                toCity: destination,
                departureDate: formattedDate,
            });

            const response = await fetch(`http://localhost:8081/api/travel/GetTravelWithCompanyDto?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Seyahatler alınamadı: ${errorText}`);
            }

            const tripData = await response.json();
            setTrips(tripData);

            if (tripData.length === 0) {
                setError('Bu kriterlere uygun seyahat bulunamadı.');
                setShowConnectedTripsButton(true);
            }
        } catch (err) {
            setError('Seyahatleri getirirken bir hata oluştu. Lütfen tekrar deneyin.');
            console.error(err);
        }
    };

    // Aktarmalı seyahatleri çekme fonksiyonu
    const handleFetchConnectedTrips = async () => {
        setError('');
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Lütfen giriş yapınız.');
            window.location.href = 'http://localhost:5173/';
            return;
        }

        if (!origin || !destination || !departureDate) {
            setError('Aktarmalı seyahatler için Nereden, Nereye ve Tarih seçilmelidir.');
            return;
        }

        try {
            const searchParams = new URLSearchParams({
                fromCity: origin.toUpperCase(),
                toCity: destination.toUpperCase(),
                departureTime: `${departureDate}T00:00:00`
            });

            const response = await fetch(`http://localhost:8081/api/travel/connected-travels?${searchParams}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });


            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend hata mesajı:', errorText);
                throw new Error(`Aktarmalı seyahatler alınamadı: ${errorText}`);
            }

            const data = await response.json();
            setConnectedTrips(data);
            setShowConnectedTripsButton(false);
        } catch (err) {
            setError('Aktarmalı seyahatler getirilirken hata oluştu.');
            console.error(err);
        }
    };

    // Koltuk seçici açma fonksiyonu
    const handleOpenSeatSelector = async (travelId) => {
        try {
            if (!travelId || travelId === 'undefined') {
                console.error("Geçersiz travelId:", travelId);
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token bulunamadı. Kullanıcı giriş yapmamış olabilir.");
                window.location.href = 'http://localhost:5173/';
                return;
            }

            const response = await fetch(`http://localhost:8081/api/ticket/booked-seats?travelId=${travelId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Bilet verisi alınamadı: ${errorText}`);
            }

            const data = await response.json();

            // 🌟 Normal triplerde ara
            let selected = trips.find(t => t.id === travelId);

            // 🌟 Eğer normal triplerde bulunamadıysa, connectedTrips içinde ara
            if (!selected) {
                for (const group of connectedTrips) {
                    selected = group.find(t => t.id === travelId);
                    if (selected) break;
                }
            }

            if (!selected) {
                console.error("Seçilen seyahat bulunamadı");
                return;
            }

            setSelectedTravelId(travelId);
            setSelectedTravel(selected);
            setBookedSeats(data);
            setShowSeatSelector(true);
        } catch (err) {
            console.error("handleOpenSeatSelector hatası:", err);
        }
    };


    // Koltuk seçici kapatma fonksiyonu
    const handleCloseSeatSelector = () => {
        setShowSeatSelector(false);
        setSelectedTravel(null);
        setBookedSeats([]);
    };

    // Tarih formatlama fonksiyonu
    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleString('tr-TR', options);
    };

    // Aktarmalı seyahatlerin render edilmesi
    const renderConnectedTrips = () => {
        if (!connectedTrips.length) return null;

        // API yapısına göre düzenle
        return connectedTrips.map((group, idx) => (
            <div key={idx} className="connected-trip-group" style={{ border: '2px solid #2196F3', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
                <h3>Aktarmalı Seyahat Grubu {idx + 1}</h3>
                {group.travels?.map((travel, i) => (
                    <div key={i} className="connected-trip-item" style={{ paddingLeft: '15px', marginBottom: '5px' }}>
                        <strong>{travel.fromCity} → {travel.toCity}</strong> ({formatDateTime(travel.departureTime)})
                        <p>Fiyat: {travel.price} TL | Firma: {travel.companyName}</p>
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <>
            <header className="header">
                <Link to="/" style={{ color: 'white' }}>
                    <h1>Nereye</h1>
                </Link>
            </header>

            <div className="home-page">
                <div className="search-container">
                    <h3>Seyahat Planınızı Seçin</h3>
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="form-group">
                            <label htmlFor="origin">Nereden:</label>
                            <select
                                id="origin"
                                value={origin}
                                onChange={e => setOrigin(e.target.value)}
                                required
                            >
                                <option value="">Şehir Seçiniz</option>
                                {cities.map(city => (
                                    <option key={city.value} value={city.value}>
                                        {city.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="destination">Nereye:</label>
                            <select
                                id="destination"
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                required
                            >
                                <option value="">Şehir Seçiniz</option>
                                {cities.map(city => (
                                    <option key={city.value} value={city.value}>
                                        {city.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="departureDate">Tarih:</label>
                            <input
                                type="date"
                                id="departureDate"
                                value={departureDate}
                                onChange={e => setDepartureDate(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Seyahat Ara</button>
                    </form>

                    {error && (
                        <div className="error-message" style={{ marginTop: '10px' }}>
                            <p className="error">{error}</p>
                            {showConnectedTripsButton && (
                                <button onClick={handleFetchConnectedTrips} className="btn-show-connected-trips">
                                    Aktarmalı Seyahatleri Göster
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Normal seyahat listesi */}
                <div className="trip-list">
                    {trips.length > 0 ? trips.map((trip, idx) => (
                        <div key={idx} className="trip-item" style={{ position: 'relative', marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <p><strong>{trip.fromCity}</strong></p>
                                    <p>{formatDateTime(trip.departureTime)}</p>
                                </div>

                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <p style={{ margin: '10px 0' }}><span style={{ fontSize: '24px' }}>→</span></p>
                                    <p>Fiyat: {trip.price} TL</p>
                                    <p>Firma: {trip.companyName}</p>
                                    <p>Ulaşım Tipi: {trip.companyType === 'BUS' ? 'Otobüs' : trip.companyType}</p>
                                </div>

                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <p><strong>{trip.toCity}</strong></p>
                                    <p>{formatDateTime(trip.arrivalTime)}</p>
                                </div>
                            </div>

                            {trip.id ? (
                                <button
                                    className="btn-select-ticket"
                                    onClick={() => handleOpenSeatSelector(trip.id)}
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        padding: '6px 12px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Bilet Seç
                                </button>
                            ) : (
                                <p style={{ color: 'red', position: 'absolute', bottom: '10px', right: '10px' }}>Trip ID eksik</p>
                            )}
                        </div>
                    )) : !error && <p> </p>}
                </div>

                {/* Aktarmalı seyahatlerin listesi */}
                {connectedTrips.length > 0 && (
                    <div className="trip-list connected-trip-list">
                        {connectedTrips.map((group, groupIdx) => (
                            <div key={groupIdx} style={{
                                border: '2px solid #fff',
                                padding: '15px',
                                borderRadius: '10px',
                                width: '100%'
                            }}>
                                <h3 style={{ margin: '10px 0', color: '#fff', textAlign: 'center' }}>
                                    Aktarmalı Seyahat {groupIdx + 1}
                                </h3>

                                {group.map((trip, idx) => (
                                    <div key={idx} className="trip-item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ flex: 1, textAlign: 'center' }}>
                                                <p><strong>{trip.fromCity}</strong></p>
                                                <p>{formatDateTime(trip.departureTime)}</p>
                                            </div>

                                            <div style={{ flex: 1, textAlign: 'center' }}>
                                                <p style={{ margin: '10px 0', fontSize: '24px' }}>→</p>
                                                <p>Fiyat: {trip.price} TL</p>
                                                <p>Firma: {trip.companyName ?? 'Bilinmiyor'}</p>
                                                <p>Ulaşım Tipi: {trip.vehicles?.type === 'BUS' ? 'Otobüs' : trip.vehicles?.type}</p>
                                            </div>

                                            <div style={{ flex: 1, textAlign: 'center' }}>
                                                <p><strong>{trip.toCity}</strong></p>
                                                <p>{formatDateTime(trip.arrivalTime)}</p>
                                            </div>
                                        </div>

                                        {trip.id ? (
                                            <button
                                                className="btn-select-ticket"
                                                onClick={() => handleOpenSeatSelector(trip.id)}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    right: '10px',
                                                    padding: '6px 12px',
                                                    backgroundColor: '#007bff',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Bilet Seç
                                            </button>
                                        ) : (
                                            <p style={{
                                                color: 'red',
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px'
                                            }}>
                                                Trip ID eksik
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}


                {/* Koltuk seçim modalı */}
                {showSeatSelector && selectedTravel && (
                    <SeatSelector
                        bookedSeats={bookedSeats}
                        onClose={handleCloseSeatSelector}
                        fromCity={selectedTravel.fromCity}
                        toCity={selectedTravel.toCity}
                        departureTime={selectedTravel.departureTime}
                        selectedTravel={selectedTravel}
                    />
                )}

            </div>
        </>
    );
};

export default HomePage;
