import React, {useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../../Env";
import "react-datepicker/dist/react-datepicker.css";

const EditCertificate = ({ data, setEditCertificate, isClicked, sessionId, setCertificateData }) => {
    const [name, setName]   = useState(data.cert_name);
    const [from,setFrom]    = useState(data.cert_from);
    const [date,setDate]    = useState(data.cert_date);
    const certificate_id    = data.id;

    const requestSaveCertificate = async () => {
        try {
            await axios.post(
                BACKEND_URL + '/edit/certificate',
                { name, from, date, certificate_id }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const requestDeleteDertificate = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(
                BACKEND_URL + '/delete/certificate',
                { certificate_id }
            );
            const res = await axios.post(BACKEND_URL + '/portfolio/main/certificates', {sessionId});
            const data = res.data.data.certificates;
            setCertificateData(data);
        } catch (e) {
            console.log(e);
        }
    }

    if (isClicked){
        requestSaveCertificate();
        setEditCertificate(false);
    }

    return (
        <main className="form-input">
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="자격증 명"
                defaultValue={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="floatingInput">자격증 명</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="제공 기관"
                defaultValue={from} onChange={e => setFrom(e.target.value)} />
                <label htmlFor="floatingInput">제공 기관</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="자격증 발급 날짜" defaultValue={date} onChange={e => setDate(e.target.value)} />
                <label htmlFor="floatingInput">자격증 발급 날짜</label>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary"
                onClick={requestDeleteDertificate}
                type="button">삭제</button>
            </div>
        </main>
    );
    
}
const Certificates = ({ certificateData, editCertificate, setEditCertificate, handleEditCertificates, isClicked, setIsClicked, setCertificateData, sessionId }) => {
    const handleCertificateSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked(prevState => (!prevState));
    }
    const requestAddCertificate = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await axios.post(BACKEND_URL + '/add/certificate', {sessionId});
        const res = await axios.post(BACKEND_URL + '/portfolio/main/certificates', {sessionId});
            const data = res.data.data.certificates;
            setCertificateData(data);
        
    }
    return (
        <div className="certificates-portfolio">
            <h3>자격증</h3>
            {
                editCertificate ?
                Array.from(certificateData).map(certificate => {
                    return (
                        <div key={`certificate_${certificate.id}_edit`}>
                            <EditCertificate data={certificate} setEditCertificate={setEditCertificate} isClicked={isClicked} setCertificateData={setCertificateData} sessionId={sessionId} />
                        </div>
                    )
                }) : 
                Array.from(certificateData).map(certificate => {
                    return (
                        <div key={`certificate_${certificate.id}`}>
                            <h5>{certificate.cert_name}</h5>
                            <h6>{certificate.cert_from}</h6>
                            <p>{certificate.cert_date}</p>
                        </div>
                        
                    )
                })
            }
            {editCertificate ?
            <div>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={requestAddCertificate} type="button">추가</button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={handleCertificateSubmit} type="submit">완료</button>
                </div>
            </div>:
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary" onClick={handleEditCertificates} type="button">수정</button>
            </div>
            }
        </div>
    );
    
}

export default Certificates;