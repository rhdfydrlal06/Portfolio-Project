import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from "axios";
import {BACKEND_URL} from "../Env"

const Header = ({ sessionId, setSessionId }) => {
    const history = useHistory();
    const logoutRequest = async () => {
        try {
            await axios.get(BACKEND_URL+'/auth/logout');
            window.sessionStorage.clear();
            setSessionId(null);
            history.push("/login");
        }
        catch (e) {
            alert(e);
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#!">RacerIn</a>
                { sessionId && (
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">메인</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/network">네트워크</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={logoutRequest} href="#!">로그아웃</a>
                            </li>
                        </ul>
                    </div>  
                )}
            </div>
        </nav>
    )

}

export default Header