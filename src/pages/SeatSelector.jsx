import React from 'react';
import seatImg from '../assets/images/seat.png';
import '../css/SeatSelector.css';

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

const SeatSelector = ({ bookedSeats, onClose }) => {
    const matrix = [
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
        [null, null, null, null, null, null, null, null, null, null, null, null, 38],
        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 39],
        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 40]
    ];

    return (
        <div className="seat-selector-container">
            <button className="seat-selector-close-btn" onClick={onClose}>Kapat</button>
            <h3 className="seat-selector-title">Koltuk Seçimi</h3>

            <div className="seat-matrix">
                {matrix.map((row, rowIndex) => (
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
        </div>
    );
};

export default SeatSelector;
