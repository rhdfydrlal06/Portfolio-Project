import React, {useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../../Env";

const EditSchool = ({ data, setEditSchool, isClicked, sessionId, setSchoolData }) => {
    const [name, setName]       = useState(data.name);
    const [major,setMajor]      = useState(data.major);
    const [status, setStatus]   = useState(data.status);
    const school_id             = data.id;

    const requestSaveSchool = async () => {
        try {
            await axios.post(
                BACKEND_URL + '/edit/school',
                { name, major, status, school_id }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const requestDeleteSchool = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(
                BACKEND_URL + '/delete/school',
                { school_id }
            );
            const res = await axios.post(BACKEND_URL + '/portfolio/main/schools', {sessionId});
            const data = res.data.data.schools;
            setSchoolData(data);
        } catch (e) {
            console.log(e);
        }
    }


    if (isClicked){
        setEditSchool(false);
        requestSaveSchool();
    }

    return (
        <main className="form-input">
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="학교이름" defaultValue={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="floatingInput">학교이름</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="전공" defaultValue={major} onChange={e => setMajor(e.target.value)} />
                <label htmlFor="floatingInput">전공</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="상태" defaultValue={status} onChange={e => setStatus(e.target.value)} />
                <label htmlFor="floatingInput">상태</label>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary" onClick={requestDeleteSchool} type="button">삭제</button>
            </div>
        </main>
    );
    
}
const Schools = ({ schoolData, editSchool, setEditSchool, handleEditSchools, isClicked, setIsClicked, setSchoolData, sessionId  }) => {
    const handleSchoolSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked(prevState => (!prevState));
    }
    const requestAddSchool = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await axios.post(BACKEND_URL + '/add/school', {sessionId});
        const res = await axios.post(BACKEND_URL + '/portfolio/main/schools', {sessionId});
            const data = res.data.data.schools;
            setSchoolData(data);
        
    }
    return (
        <div className="school-portfolio">
            <h3>학력</h3>
            {
                editSchool ?
                Array.from(schoolData).map(school => {
                    return (
                        <div key={`school_${school.id}_edit`}>
                            <EditSchool data={school} setEditSchool={setEditSchool} isClicked={isClicked} setSchoolData={setSchoolData} sessionId={sessionId}  />
                        </div>
                    )
                }) : 
                Array.from(schoolData).map(school => {
                    return (
                        <div key={`school_${school.id}_read`}>
                            <h5>{school.name}</h5>
                            <h6>{school.major}</h6>
                            <p>{school.status}</p>
                        </div>
                        
                    )
                })
            }
            {
                editSchool ?
                    <div>
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button className="btn btn-outline-primary" onClick={requestAddSchool} type="button">추가</button>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button className="btn btn-outline-primary" onClick={handleSchoolSubmit} type="submit">완료</button>
                        </div>
                    </div> :
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button className="btn btn-outline-primary" onClick={handleEditSchools} type="button">수정</button>
                    </div>
            }
        </div>
    );
    
}

export default Schools;