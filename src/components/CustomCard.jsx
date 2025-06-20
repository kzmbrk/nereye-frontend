// CustomCard.jsx
import React from 'react';
import AmexLogo from '../assets/images/CardLogos/amex.svg';
import TroyLogo from '../assets/images/CardLogos/troy.svg';
import MaestroLogo from '../assets/images/CardLogos/maestro.svg';
import MastercardLogo from '../assets/images/CardLogos/mastercard.svg';
import VisaLogo from '../assets/images/CardLogos/visa.svg';

const CustomCard = ({ logo }) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#633EF8',
            boxShadow: '0px 8.72px 87.18px 21.79px rgba(99, 62, 248, 0.18)',
            overflow: 'hidden',
            borderRadius: 21.79
        }}>
            {/* Varolan arka plan şekilleri */}
            <div style={{ width: 564.48, height: 564.48, left: 307.30, top: -26.15, position: 'absolute', background: '#8567FF', borderRadius: 9999 }} />
            <div style={{ width: 494.73, height: 494.73, left: 363.97, top: 126.41, position: 'absolute', background: '#7856FF', borderRadius: 9999 }} />
            <div style={{ width: 19.14, height: 34.38, left: 564.14, top: 322.88, position: 'absolute', background: '#FF5F00' }} />
            <div style={{ width: 63.78, height: 8.26, left: 541.91, top: 366.43, position: 'absolute', background: 'white' }} />
            <div style={{ width: 35.35, height: 43.74, left: 538.32, top: 318.20, position: 'absolute', background: '#EB001B' }} />
            <div style={{ width: 35.35, height: 43.74, left: 573.74, top: 318.20, position: 'absolute', background: '#F79E1B' }} />

            {/* Kart üzerindeki yazılar */}
            <div style={{ left: 34.87, top: 43.59, position: 'absolute', opacity: 0.90, color: 'white', fontSize: 21.79, fontFamily: 'Inter, sans-serif', fontWeight: '600', lineHeight: 52.31, wordWrap: 'break-word' }}>
                Savannah Nguyen
            </div>
            <div style={{ left: 503.45, top: 43.59, position: 'absolute', opacity: 0.90, color: 'white', fontSize: 21.79, fontFamily: 'Inter, sans-serif', fontWeight: '600', lineHeight: 52.31, wordWrap: 'break-word' }}>
                Tap to pay
            </div>

            {/* Sağ alt köşede logo */}
            {logo && (
                <img
                    src={logo}
                    alt="Card Logo"
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        width: 60,
                        height: 40,
                        objectFit: 'contain',
                    }}
                />
            )}
        </div>
    );
};

export default CustomCard;
