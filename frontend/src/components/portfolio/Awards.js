import React, {useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../../Env";

const EditAward = ({ data, setEditAward, isClicked, sessionId, setAwardData }) => {
    const [award, setAward]                 = useState(data.awards);
    const [awardDetail,setAwardDetail]      = useState(data.awards_details);
    const award_id                          = data.id;

    const requestSaveAward = async () => {
        try {
            await axios.post(
                BACKEND_URL + '/edit/award',
                { award, awardDetail, award_id }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const requestDeleteAward = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(
                BACKEND_URL + '/delete/award',
                { award_id }
            );
            const res = await axios.post(BACKEND_URL + '/portfolio/main/awards', {sessionId});
            const data = res.data.data.awards;
            setAwardData(data);
        } catch (e) {
            console.log(e);
        }
    }

    if (isClicked){
        requestSaveAward();
        setEditAward(false);
    }

    return (
        <main className="form-input">
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="수상 이름" defaultValue={award} onChange={e => setAward(e.target.value)} />
                <label htmlFor="floatingInput">수상 이름</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="수상 내용" defaultValue={awardDetail} onChange={e => setAwardDetail(e.target.value)} />
                <label htmlFor="floatingInput">수상 내용</label>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary" onClick={requestDeleteAward} type="button">삭제</button>
            </div>
        </main>
    );
    
}
const Awards = ({ awardData, editAward, setEditAward, handleEditAwards, isClicked, setIsClicked, setAwardData, sessionId }) => {
    const handleAwardSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked(prevState => (!prevState));
    }
    const requestAddAward = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await axios.post(BACKEND_URL + '/add/award', {sessionId});
        const res = await axios.post(BACKEND_URL + '/portfolio/main/awards', {sessionId});
            const data = res.data.data.awards;
            setAwardData(data);
        
    }
    return (
        <div className="awards-portfolio">
            <h3>수상이력</h3>
            {
                editAward ?
                Array.from(awardData).map(award => {
                    return (
                        <div key={`award_${award.id}_edit`}>
                            <EditAward data={award} setEditAward={setEditAward} isClicked={isClicked} sessionId={sessionId} setAwardData={setAwardData} />
                        </div>
                    )
                }) : 
                Array.from(awardData).map(award => {
                    return (
                        <div key={`award_${award.id}`}>
                            <h5>{award.awards}</h5>
                            <p>{award.awards_details}</p>
                        </div>
                        
                    )
                })
            }
            {editAward ?
            <div>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={requestAddAward} type="button">추가</button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={handleAwardSubmit} type="submit">완료</button>
                </div>
            </div>:
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={handleEditAwards} type="button">수정</button>
                </div>
            }
        </div>
    );
    
}

export default Awards;