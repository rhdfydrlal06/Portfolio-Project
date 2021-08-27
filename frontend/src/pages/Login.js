import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {BACKEND_URL} from "../Env";

const Login = ({ setSessionId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    const requestLogin = async () => {
        try {
            const res = await axios.post(
                BACKEND_URL + '/auth/login',
                { email, password }
            );
            if (res.data.result==="success") {
                const user_id = res.data.data.user_data.id;
                setSessionId(user_id);
                window.sessionStorage.setItem("id", user_id);
                history.push("/");
            } else{
                alert(res.data.message);
                history.push("/");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        requestLogin();
    }

        return (
            <div className="text-center">
                <main className="form-signin">
                    <form onSubmit={e =>handleLoginSubmit(e)}>
                        <h1 className="h3 mb-3 fw-normal">Please login</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-secondary" type="submit">Sign in</button>
                        <button type="button" className="w-100 btn btn-lg btn-light" onClick={() => history.push("/signup")}>회원가입하기</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2021 RacerIn Co. all rights reserved.</p>
                    </form>
                </main>
            </div>
        );
}

export default Login;