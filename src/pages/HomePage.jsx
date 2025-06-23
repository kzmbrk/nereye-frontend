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
    const handleOpenSeatSelector = async (travelId) => {
        try {

            if (!travelId || travelId === 'undefined') {
                console.error("Geçersiz travelId:", travelId);
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token bulunamadı. Kullanıcı giriş yapmamış olabilir.");
                // Anasayfaya yönlendir
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
            setSelectedTravelId(travelId);
            setBookedSeats(data);
            setShowSeatSelector(true);
        } catch (err) {
            console.error("handleOpenSeatSelector hatası:", err);
        }
    };

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('token');
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);



    const handleCloseSeatSelector = () => {
        setShowSeatSelector(false);
        setSelectedTravelId(null);
        setBookedSeats([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const originCity = cities.find(city => city.value === origin);
            const destinationCity = cities.find(city => city.value === destination);

            if (!originCity || !destinationCity) {
                setError('Lütfen geçerli bir şehir seçiniz.');
                return;
            }

            const formattedDate = `${departureDate}T00:00:00`;

            const searchParams = new URLSearchParams({
                fromCity: originCity.value,
                toCity: destinationCity.value,
                departureDate: formattedDate
            });

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token bulunamadı. Kullanıcı giriş yapmamış olabilir.");
                window.location.href = 'http://localhost:5173/';
                alert('Lütfen Giriş Yapınız');
                return;
            }

            const response = await fetch(`http://localhost:8081/api/travel/GetTravelWithCompanyDto?${searchParams}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // ✅ Token ekleniyor
                }
            });


            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
            }

            const tripData = await response.json();
            setTrips(tripData);

            if (tripData.length === 0) {
                setError('Bu kriterlere uygun seyahat bulunamadı.');
            }
        } catch (err) {
            setError('Seyahatleri getirirken bir hata oluştu. Lütfen tekrar deneyin.');
            console.error('Error fetching trips:', err);
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleString('tr-TR', options);
    };

    return (
        <>
            <header className="header">
                <Link style={{ color: 'white' }} to="/">
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
                                onChange={(e) => setOrigin(e.target.value)}
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
                                onChange={(e) => setDestination(e.target.value)}
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
                                onChange={(e) => setDepartureDate(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Seyahat Ara</button>
                    </form>

                    {error && <p className="error">{error}</p>}
                </div>

                <div className="trip-list">
                    {trips.length > 0 ? (
                        trips.map((trip, index) => {
                            console.log("trip:", trip); // 🔍 id kontrolü için

                            return (
                                <div key={index} className="trip-item" style={{ position: 'relative', marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        {/* Nereden */}
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p><strong>{trip.fromCity}</strong></p>
                                            <p>{formatDateTime(trip.departureTime)}</p>
                                        </div>

                                        {/* Orta kısım */}
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p style={{ margin: '10px 0' }}>
                                                <span style={{ fontSize: '24px' }}>→</span>
                                            </p>
                                            <p>Fiyat: {trip.price} TL</p>
                                            <p>Firma: {trip.companyName}</p>
                                            <p>Ulaşım Tipi: {trip.companyType === 'BUS' ? 'Otobüs' : trip.companyType}</p>
                                        </div>

                                        {/* Nereye */}
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p><strong>{trip.toCity}</strong></p>
                                            <p>{formatDateTime(trip.arrivalTime)}</p>
                                        </div>
                                    </div>

                                    {/* Bilet Seç Butonu */}
                                    {trip.id ? (
                                        <button
                                            onClick={() => handleOpenSeatSelector(trip.id)}
                                            style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                padding: '6px 12px',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Bilet Seç
                                        </button>
                                    ) : (
                                        <p style={{ color: 'red', position: 'absolute', bottom: '10px', right: '10px' }}>
                                            Trip ID eksik
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        !error && <p></p>
                    )}
                </div>


                {/* Koltuk seçim modalı */}
                {showSeatSelector && (
                    <SeatSelector
                        bookedSeats={bookedSeats}
                        onClose={handleCloseSeatSelector}
                    />
                )}
            </div>
        </>
    );
};

export default HomePage;
