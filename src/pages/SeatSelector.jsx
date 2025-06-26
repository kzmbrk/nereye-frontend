import React, { useEffect, useState } from 'react';
import seatImg from '../assets/images/seat.png';
import '../css/SeatSelector.css';
import SunCalc from 'suncalc';

const cityCoordinates = {
    "ADANA": { lat: 37.0000, lon: 35.3213 },
    "ADIYAMAN": { lat: 37.7648, lon: 38.2786 },
    "AFYONKARAHISAR": { lat: 38.7507, lon: 30.5567 },
    "AGRI": { lat: 39.7191, lon: 43.0503 },
    "AMASYA": { lat: 40.6499, lon: 35.8353 },
    "ANKARA": { lat: 39.9208, lon: 32.8541 },
    "ANTALYA": { lat: 36.8841, lon: 30.7056 },
    "ARTVIN": { lat: 41.1828, lon: 41.8194 },
    "AYDIN": { lat: 37.8450, lon: 27.8396 },
    "BALIKESIR": { lat: 39.6484, lon: 27.8826 },
    "BARTIN": { lat: 41.5811, lon: 32.4609 },
    "BATMAN": { lat: 37.8812, lon: 41.1351 },
    "BAYBURT": { lat: 40.2552, lon: 40.2249 },
    "BILECIK": { lat: 40.1500, lon: 29.9833 },
    "BINGOL": { lat: 38.8853, lon: 40.4983 },
    "BITLIS": { lat: 38.4000, lon: 42.1167 },
    "BOLU": { lat: 40.7395, lon: 31.6116 },
    "BURDUR": { lat: 37.7203, lon: 30.2908 },
    "BURSA": { lat: 40.1828, lon: 29.0665 },
    "CANAKKALE": { lat: 40.1467, lon: 26.4086 },
    "CANKIRI": { lat: 40.6000, lon: 33.6167 },
    "CORUM": { lat: 40.5506, lon: 34.9556 },
    "DENIZLI": { lat: 37.7765, lon: 29.0864 },
    "DIYARBAKIR": { lat: 37.9144, lon: 40.2306 },
    "DUZCE": { lat: 40.8438, lon: 31.1565 },
    "EDIRNE": { lat: 41.6771, lon: 26.5556 },
    "ELAZIG": { lat: 38.6743, lon: 39.2220 },
    "ERZINCAN": { lat: 39.7500, lon: 39.5000 },
    "ERZURUM": { lat: 39.9043, lon: 41.2679 },
    "ESKISEHIR": { lat: 39.7667, lon: 30.5256 },
    "GAZIANTEP": { lat: 37.0662, lon: 37.3833 },
    "GIRESUN": { lat: 40.9128, lon: 38.3895 },
    "GUMUSHANE": { lat: 40.4603, lon: 39.4814 },
    "HAKKARI": { lat: 37.5833, lon: 43.7333 },
    "HATAY": { lat: 36.4018, lon: 36.3498 },
    "IGDIR": { lat: 39.8880, lon: 44.0048 },
    "ISPARTA": { lat: 37.7648, lon: 30.5566 },
    "ISTANBUL": { lat: 41.0082, lon: 28.9784 },
    "IZMIR": { lat: 38.4192, lon: 27.1287 },
    "KAHRAMANMARAS": { lat: 37.5736, lon: 36.9371 },
    "KARABUK": { lat: 41.2061, lon: 32.6204 },
    "KARAMAN": { lat: 37.1811, lon: 33.2150 },
    "KARS": { lat: 40.6167, lon: 43.1000 },
    "KASTAMONU": { lat: 41.3887, lon: 33.7827 },
    "KAYSERI": { lat: 38.7225, lon: 35.4875 },
    "KILIS": { lat: 36.7184, lon: 37.1212 },
    "KIRIKKALE": { lat: 39.8468, lon: 33.5153 },
    "KIRKLARELI": { lat: 41.7351, lon: 27.2246 },
    "KIRSEHIR": { lat: 39.1458, lon: 34.1606 },
    "KOCAELI": { lat: 40.8533, lon: 29.8815 },
    "KONYA": { lat: 37.8667, lon: 32.4833 },
    "KUTAHYA": { lat: 39.4167, lon: 29.9833 },
    "MALATYA": { lat: 38.3552, lon: 38.3095 },
    "MANISA": { lat: 38.6191, lon: 27.4289 },
    "MARDIN": { lat: 37.3212, lon: 40.7245 },
    "MERSIN": { lat: 36.8000, lon: 34.6333 },
    "MUGLA": { lat: 37.2153, lon: 28.3636 },
    "MUS": { lat: 38.9462, lon: 41.7539 },
    "NEVSEHIR": { lat: 38.6244, lon: 34.7121 },
    "NIGDE": { lat: 37.9667, lon: 34.6833 },
    "ORDU": { lat: 40.9839, lon: 37.8764 },
    "OSMANIYE": { lat: 37.0681, lon: 36.2615 },
    "RIZE": { lat: 41.0201, lon: 40.5234 },
    "SAKARYA": { lat: 40.6930, lon: 30.4358 },
    "SAMSUN": { lat: 41.2867, lon: 36.3300 },
    "SANLIURFA": { lat: 37.1591, lon: 38.7969 },
    "SIIRT": { lat: 37.9333, lon: 41.9500 },
    "SINOP": { lat: 42.0260, lon: 35.1551 },
    "SIRNAK": { lat: 37.4187, lon: 42.4918 },
    "SIVAS": { lat: 39.7500, lon: 37.0167 },
    "TEKIRDAG": { lat: 40.9780, lon: 27.5110 },
    "TOKAT": { lat: 40.3167, lon: 36.5500 },
    "TRABZON": { lat: 41.0015, lon: 39.7178 },
    "TUNCELI": { lat: 39.1084, lon: 39.5482 },
    "USAK": { lat: 38.6823, lon: 29.4082 },
    "VAN": { lat: 38.4891, lon: 43.4089 },
    "YALOVA": { lat: 40.6500, lon: 29.2667 },
    "YOZGAT": { lat: 39.8181, lon: 34.8147 },
    "ZONGULDAK": { lat: 41.4564, lon: 31.7987 }
};



function getAzimuth(from, to) {
    const φ1 = (from.lat * Math.PI) / 180;
    const φ2 = (to.lat * Math.PI) / 180;
    const Δλ = ((to.lon - from.lon) * Math.PI) / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    const bearing = (θ * 180) / Math.PI;
    return (bearing + 360) % 360;
}

function getSunSide(busAzimuth, sunAzimuth) {
    const angleDiff = (sunAzimuth - busAzimuth + 360) % 360;
    if (angleDiff >= 45 && angleDiff <= 135) return 'sağ';
    if (angleDiff >= 225 && angleDiff <= 315) return 'sol';
    return 'önden veya arkadan';
}

const Seat = ({ seatNumber, isBooked }) => (
    <div className="seat">
        <img src={seatImg} alt={`Seat ${seatNumber}`} />
        <div
            className={`status-indicator ${isBooked ? 'status-booked' : 'status-available'}`}
            title={isBooked ? 'Dolu Koltuk' : 'Boş Koltuk'}
        />
        <span className="seat-number">{seatNumber}</span>
    </div>
);

const SeatSelector = ({ bookedSeats, onClose, fromCity, toCity, departureTime }) => {
    const [sunSideText, setSunSideText] = useState('');

    useEffect(() => {
        const from = cityCoordinates[fromCity];
        const to = cityCoordinates[toCity];

        if (!from || !to || !departureTime) {
            setSunSideText('');
            return;
        }

        const busAzimuth = getAzimuth(from, to);
        const sun = SunCalc.getPosition(new Date(departureTime), from.lat, from.lon);
        const sunAzimuth = (sun.azimuth * 180) / Math.PI + 180;
        const side = getSunSide(busAzimuth, sunAzimuth);

        if (side === 'sol') {
            setSunSideText('☀️ Bu seferde güneş çoğunlukla sol taraftan vuracaktır.');
        } else if (side === 'sağ') {
            setSunSideText('☀️ Bu seferde güneş çoğunlukla sağ taraftan vuracaktır.');
        } else {
            setSunSideText('☀️ Güneş bu seyahatte doğrudan önden ya da arkadan gelecektir.');
        }
    }, [fromCity, toCity, departureTime]);

    const matrix = [
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
        [null, null, null, null, null, null, null, null, null, null, null, null, 38],
        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 39],
        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 40]
    ];
    const rotatedPlaneMatrix = [
        ['5F', '6F', '7F', '8F', '9F', '10F', '11F', '12F', '13F', '14F'],
        ['5E', '6E', '7E', '8E', '9E', '10E', '11E', '12E', '13E', '14E'],
        ['5D', '6D', '7D', '8D', '9D', '10D', '11D', '12D', '13D', '14D'],
        [null, null, null, null, null, null, null, null, null, null],
        ['5C', '6C', '7C', '8C', '9C', '10C', '11C', '12C', '13C', '14C'],
        ['5B', '6B', '7B', '8B', '9B', '10B', '11B', '12B', '13B', '14B'],
        ['5A', '6A', '7A', '8A', '9A', '10A', '11A', '12A', '13A', '14A']
    ];




    return (
        <div className="seat-selector-container">
            <button className="seat-selector-close-btn" onClick={onClose}>Kapat</button>
            <h3 className="seat-selector-title">Koltuk Seçimi</h3>
            <div className="seat-matrix">
                {rotatedPlaneMatrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seatNumber, colIndex) =>
                            seatNumber ? (
                                <Seat
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    isBooked={bookedSeats.includes(seatNumber)}
                                />
                            ) : (
                                <div key={`empty-${rowIndex}-${colIndex}`} className="empty-seat" />
                            )
                        )}
                    </div>

                ))}
            </div>
            <div>
                {/* ☀️ Güneş bilgisi */}
                {sunSideText && (
                    <div className="sun-info" style={{
                        marginTop: '20px',
                        marginBottom: '15px',
                        fontSize: '15px',
                        fontStyle: 'italic',
                        color: '#555',
                        textAlign: 'center'
                    }}>
                        {sunSideText}

                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatSelector;
