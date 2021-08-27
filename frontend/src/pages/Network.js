import React, { useState, useEffect } from 'react';
import { Redirect, useHistory  } from 'react-router-dom';
import { FullPage } from '../styles/MainStyle';
import axios from "axios";
import { CardGroup, Card, Button } from 'react-bootstrap';
import {BACKEND_URL} from "../Env";

const ProfileCard = ({ data, setReadWhos }) => {
    const history = useHistory();

    const routeChange = () =>{
        setReadWhos(data.user_id);
        history.push('/read_portfolio');
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.comments}</Card.Text>
                <Button variant="primary" onClick={routeChange}>정보보기</Button>
            </Card.Body>
        </Card>
        
    );
}

const Network = ({ sessionId, setReadWhos }) => {
    const [serach, setSearch] = useState('');
    const [userData, setUserData] = useState('');
    useEffect(()=>{
        // Default roaded data
        const fetchUser = async () => {
            const res = await axios.post(BACKEND_URL + '/network/search_user', {serach, sessionId});
            const data = res.data.data;
            setUserData(data.users);
        }
        fetchUser();
    },[serach, sessionId, setUserData])

    return (
        <FullPage>
            {sessionId === null && <Redirect to="/login" />}
            <div className="card text-center">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="이름으로 검색" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => setSearch(e.target.value)} />
                </div>
                {
                Array.from(userData).map(user => {
                    return (
                        <CardGroup key={`${user.id}_search`}>
                            <ProfileCard data={user} setReadWhos={setReadWhos} />
                        </CardGroup>
                    )
                })
            }
            </div>
        </FullPage>
    );
    
}

export default Network;