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
    return (θ * 180 / Math.PI + 360) % 360;
}

function getSunSide(busAzimuth, sunAzimuth) {
    const diff = (sunAzimuth - busAzimuth + 360) % 360;
    if (diff >= 45 && diff <= 135) return 'sağ';
    if (diff >= 225 && diff <= 315) return 'sol';
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

const SeatSelector = ({ bookedSeats, onClose, fromCity, toCity, departureTime, selectedTravel }) => {
    const [sunSideText, setSunSideText] = useState('');
    const [selectedMatrix, setSelectedMatrix] = useState('BUSINESS');

    useEffect(() => {
        const from = cityCoordinates[fromCity];
        const to = cityCoordinates[toCity];
        if (!from || !to || !departureTime) return;

        const busAzimuth = getAzimuth(from, to);
        const sun = SunCalc.getPosition(new Date(departureTime), from.lat, from.lon);
        const sunAzimuth = (sun.azimuth * 180) / Math.PI + 180;

        const side = getSunSide(busAzimuth, sunAzimuth);
        if (side === 'sol') setSunSideText('☀️ Bu seferde güneş çoğunlukla sol taraftan vuracaktır.');
        else if (side === 'sağ') setSunSideText('☀️ Bu seferde güneş çoğunlukla sağ taraftan vuracaktır.');
        else setSunSideText('☀️ Güneş bu seyahatte doğrudan önden ya da arkadan gelecektir.');
    }, [fromCity, toCity, departureTime]);

    const busMatrix = [
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
        [null, null, null, null, null, null, null, null, null, null, null, null, 38],
        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 39],
        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 40]
    ];

    const businessPlaneMatrix = [
        ['4', '8', '12', '16', '20', '24'],
        ['3', '7', '11', '15', '19', '23'],
        [null, null, null, null, null, null],
        ['2', '6', '10', '14', '18', '22'],
        ['1', '5', '9', '13', '17', '21']
    ];

    const economyFlexPlaneMatrix = [
        ['90', '96', '102', '108', '114'],
        ['89', '95', '101', '107', '113'],
        ['88', '94', '100', '106', '112'],
        [null, null, null, null, null],
        ['87', '93', '99', '105', '111'],
        ['86', '92', '98', '104', '110'],
        ['85', '91', '97', '103', '109']
    ];

    const economyPlaneMatrix = [
        ['30', '36', '42', '48', '54', '60', '66', '72', '78', '84'],
        ['29', '35', '41', '47', '53', '59', '65', '71', '77', '83'],
        ['28', '34', '40', '46', '52', '58', '64', '70', '76', '82'],
        [null, null, null, null, null, null, null, null, null, null],
        ['27', '33', '39', '45', '51', '57', '63', '69', '75', '81'],
        ['26', '32', '38', '44', '50', '56', '62', '68', '74', '80'],
        ['25', '31', '37', '43', '49', '55', '61', '67', '73', '79']
    ];

    const trainMatrix2 = [
        ['28', '32', '36', '40', '44', '48'],
        ['27', '31', '35', '39', '43', '47'],
        [null, null, null, null, null, null],
        ['26', '30', '34', '38', '42', '46'],
        ['25', '29', '33', '37', '41', '45']
    ];

    const trainMatrix3 = [
        ['52', '56', '60', '64', '68', '72'],
        ['51', '55', '59', '63', '67', '71'],
        [null, null, null, null, null, null],
        ['50', '54', '58', '62', '66', '70'],
        ['49', '53', '57', '61', '65', '69']
    ];

    const getActiveMatrix = () => {
        if (!selectedTravel || !selectedTravel.vehicles) return [];

        const type = selectedTravel.vehicles.type;
        if (type === 'BUS') return busMatrix;
        if (type === 'AIRLINE') {
            if (selectedMatrix === 'ECONOMY') return economyPlaneMatrix;
            if (selectedMatrix === 'ECONOMY_FLEX') return economyFlexPlaneMatrix;
            return businessPlaneMatrix;
        }
        if (type === 'TRAIN') {
            return selectedMatrix === 'VAGON3' ? trainMatrix3 : trainMatrix2;
        }

        return [];
    };

    const renderComboBox = () => {
        if (!selectedTravel || !selectedTravel.vehicles) return null;

        const type = selectedTravel.vehicles.type;
        if (type === 'AIRLINE') {
            return (
                <div>
                    <select className='custom-select' onChange={(e) => setSelectedMatrix(e.target.value)} value={selectedMatrix}>
                        <option value="BUSINESS">Business</option>
                        <option value="ECONOMY">Economy</option>
                        <option value="ECONOMY_FLEX">Economy Flex</option>
                    </select>
                </div>

            );
        }
        if (type === 'TRAIN') {
            return (
                <div>
                    <select className='custom-select' onChange={(e) => setSelectedMatrix(e.target.value)} value={selectedMatrix}>
                        <option value="VAGON2">2. Vagon</option>
                        <option value="VAGON3">3. Vagon</option>
                    </select>
                </div>

            );
        }
        return null;
    };

    const activeMatrix = getActiveMatrix();

    return (
        <div className="seat-selector-container">
            <button className="seat-selector-close-btn" onClick={onClose}>Kapat</button>
            <h3 className="seat-selector-title">Koltuk Seçimi</h3>

            {renderComboBox() && (
                <div style={{ marginBottom: '15px' }}>{renderComboBox()}</div>
            )}

            <div className="seat-matrix">
                {activeMatrix.map((row, rowIndex) => (
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

            {sunSideText && (
                <div className="sun-info" style={{
                    marginTop: '20px',
                    fontSize: '15px',
                    fontStyle: 'italic',
                    color: '#555',
                    textAlign: 'center'
                }}>
                    {sunSideText}
                </div>
            )}
        </div>
    );
};

export default SeatSelector;
