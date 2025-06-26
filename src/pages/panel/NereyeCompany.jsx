import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/panelCss/NereyeCompany.css';


const NereyeCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get('http://localhost:8081/api/companyStatus/whitelisted', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setCompanies(res.data);
            })
            .catch(err => {
                console.error(err);
                setCompanies([]);
            });
    }, []);

    const handleBlacklist = (companyId) => {

        axios.post(`http://localhost:8081/api/companyStatus/blacklist/${companyId}`, description, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Kara listeye alma hatası:', err);
            });
    };

    return (
        <div className='myContainer'>
            <div>
                {companies.length === 0 ? (
                    <div>Hiç şirket bulunamadı.</div>
                ) : (
                    companies.map(company => (
                        <div key={company.name} className="company-container">
                            <div className="company-info">
                                <div><strong>Ad:</strong> {company.name}</div>
                                <div><strong>Vergi No:</strong> {company.taxNumber}</div>
                                <div><strong>E-posta:</strong> {company.email}</div>
                                <div><strong>Tip:</strong> {company.companyType}</div>
                            </div>

                            {selectedCompany === company.name ? (
                                <>
                                    <textarea
                                        className="blacklist-textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Açıklama girin..."
                                        rows={3}
                                    />
                                    <button className="confirm-button" onClick={() => handleBlacklist(company.id)}>
                                        Onayla
                                    </button>
                                </>
                            ) : (
                                <button className="blacklist-button" onClick={() => setSelectedCompany(company.name)}>
                                    Kara Listeye Al
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>

    );

};

export default NereyeCompany;
