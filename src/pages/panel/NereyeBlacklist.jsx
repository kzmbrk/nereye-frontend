import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NereyeBlacklist() {
    return (
        <div style={{ padding: '20px' }}>
            <h2>NereyeBlacklist</h2>

            <button onClick={() => toast.success("İşlem başarılı!")} style={{ margin: '5px' }}>
                Success Toast
            </button>

            <button onClick={() => toast.error("Bir hata oluştu!")} style={{ margin: '5px' }}>
                Error Toast
            </button>

            <button onClick={() => toast.info("Yeni bir güncelleme var.")} style={{ margin: '5px' }}>
                Info Toast
            </button>

            <button onClick={() => toast.warn("Dikkat, işlem sırasında sorun oluşabilir.")} style={{ margin: '5px' }}>
                Warn Toast
            </button>

            <button onClick={() => toast.dark("Koyu tema bildirimi.")} style={{ margin: '5px' }}>
                Dark Toast
            </button>

            <button onClick={() => toast("Bu normal bildirim.")} style={{ margin: '5px' }}>
                Normal Toast
            </button>

            <ToastContainer />
        </div>
    );
}

export default NereyeBlacklist;
