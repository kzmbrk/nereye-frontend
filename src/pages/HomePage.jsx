import React, { useState } from 'react';
import '../css/HomePage.css';

const HomePage = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState('');

    const cities = [
        { value: 'ADANA', label: 'Adana' }, { value: 'ADIYAMAN', label: 'Adıyaman' }, { value: 'AFYONKARAHISAR', label: 'Afyonkarahisar' }, { value: 'AGRI', label: 'Ağrı' },
        { value: 'AMASYA', label: 'Amasya' }, { value: 'ANKARA', label: 'Ankara' }, { value: 'ANTALYA', label: 'Antalya' }, { value: 'ARTVIN', label: 'Artvin' },
        { value: 'AYDIN', label: 'Aydın' }, { value: 'BALIKESIR', label: 'Balıkesir' }, { value: 'BILECIK', label: 'Bilecik' }, { value: 'BINGOL', label: 'Bingöl' }, { value: 'BITLIS', label: 'Bitlis' },
        { value: 'BOLU', label: 'Bolu' }, { value: 'BURDUR', label: 'Burdur' }, { value: 'BURSA', label: 'Bursa' }, { value: 'CANAKKALE', label: 'Çanakkale' }, { value: 'CANKIRI', label: 'Çankırı' },
        { value: 'CORUM', label: 'Çorum' }, { value: 'DENIZLI', label: 'Denizli' }, { value: 'DIYARBAKIR', label: 'Diyarbakır' }, { value: 'EDIRNE', label: 'Edirne' }, { value: 'ELAZIG', label: 'Elazığ' },
        { value: 'ERZINCAN', label: 'Erzincan' }, { value: 'ERZURUM', label: 'Erzurum' }, { value: 'ESKISEHIR', label: 'Eskişehir' }, { value: 'GAZIANTEP', label: 'Gaziantep' }, { value: 'GIRESUN', label: 'Giresun' },
        { value: 'GUMUSHANE', label: 'Gümüşhane' }, { value: 'HAKKARI', label: 'Hakkari' }, { value: 'HATAY', label: 'Hatay' }, { value: 'IGDIR', label: 'Iğdır' },
        { value: 'ISPARTA', label: 'Isparta' }, { value: 'ISTANBUL', label: 'İstanbul' }, { value: 'IZMIR', label: 'İzmir' }, { value: 'KAHRAMANMARAS', label: 'Kahramanmaraş' }, { value: 'KARABUK', label: 'Karabük' },
        { value: 'KARAMAN', label: 'Karaman' }, { value: 'KARS', label: 'Kars' }, { value: 'KASTAMONU', label: 'Kastamonu' }, { value: 'KAYSERI', label: 'Kayseri' }, { value: 'KILIS', label: 'Kilis' },
        { value: 'KIRIKKALE', label: 'Kırıkkale' }, { value: 'KIRKLARELI', label: 'Kırklareli' }, { value: 'KIRSEHIR', label: 'Kırşehir' }, { value: 'KOCAELI', label: 'Kocaeli' },
        { value: 'KONYA', label: 'Konya' }, { value: 'KUTAHYA', label: 'Kütahya' }, { value: 'MALATYA', label: 'Malatya' }, { value: 'MANISA', label: 'Manisa' }, { value: 'MARDIN', label: 'Mardin' },
        { value: 'MERSIN', label: 'Mersin' }, { value: 'MUGLA', label: 'Muğla' }, { value: 'MUS', label: 'Muş' }, { value: 'NEVSEHIR', label: 'Nevşehir' }, { value: 'NIGDE', label: 'Niğde' },
        { value: 'ORDU', label: 'Ordu' }, { value: 'OSMANIYE', label: 'Osmaniye' }, { value: 'RIZE', label: 'Rize' }, { value: 'SAKARYA', label: 'Sakarya' },
        { value: 'SAMSUN', label: 'Samsun' }, { value: 'SANLIURFA', label: 'Şanlıurfa' }, { value: 'SIIRT', label: 'Siirt' }, { value: 'SINOP', label: 'Sinop' },
        { value: 'SIRNAK', label: 'Şırnak' }, { value: 'SIVAS', label: 'Sivas' }, { value: 'TEKIRDAG', label: 'Tekirdağ' }, { value: 'TOKAT', label: 'Tokat' },
        { value: 'TRABZON', label: 'Trabzon' }, { value: 'TUNCELI', label: 'Tunceli' }, { value: 'USAK', label: 'Uşak' }, { value: 'VAN', label: 'Van' },
        { value: 'YALOVA', label: 'Yalova' }, { value: 'YOZGAT', label: 'Yozgat' }, { value: 'ZONGULDAK', label: 'Zonguldak' }, { value: 'DUZCE', label: 'Düzce' }
    ];
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

            const response = await fetch(`http://localhost:8081/api/travel/GetTravelWithCompanyDto?${searchParams}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <header className="header">
                <h1>Nereye</h1>
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
                        <div>
                            {trips.map((trip, index) => (
                                <div key={index} className="trip-item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p><strong>{trip.fromCity}</strong></p>
                                            <p>{formatDateTime(trip.departureTime)}</p>
                                        </div>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p style={{ margin: '10px 0' }}>
                                                <span style={{ fontSize: '24px' }}>→</span>
                                            </p>
                                            <p>Fiyat: {trip.price} TL</p>
                                            <p>Firma: {trip.companyName}</p>
                                            <p>Ulaşım Tipi: {trip.companyType === 'BUS' ? 'Otobüs' : trip.companyType}</p>
                                        </div>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <p><strong>{trip.toCity}</strong></p>
                                            <p>{formatDateTime(trip.arrivalTime)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !error && <p></p>
                    )}
                </div>
            </div>

            <footer className="footer">
                <p>© 2025 Nereye. Tüm hakları saklıdır..</p>
            </footer>
        </>
    );
};

export default HomePage;