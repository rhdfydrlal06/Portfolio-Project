import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {BACKEND_URL} from "../Env";


const Signup = () => {
    // 입력값 저장할 state들
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [name, setName] = useState("");

    // redirect 보내기
    const history = useHistory();
    // 백앤드로 데이터 전송 및 응답 받기
    const requestSignUp = async () => {
        try {
            const res = await axios.post(
                BACKEND_URL + '/auth/signup',
                { email, password, checkPassword, name }
            );
            alert(res.data.message);
            if (res.data.result==="success") {
                window.location.href= "/";
            }
            history.push("/signup");   
        } catch (e) {
            console.log(e);
        }
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        requestSignUp();
    }


        return (
            <div className="text-center">
                <main className="form-signin">
                    <form onSubmit={e =>handleSignUpSubmit(e)}>
                        <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <label name="password" htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating">
                            <input name="check_password" type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setCheckPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Check Password</label>
                        </div>
                        <div className="form-floating">
                            <input name="name" type="name" className="form-control" id="floatingPassword" placeholder="이름 입력" onChange={e => setName(e.target.value)} />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-secondary" type="submit">Sign up</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2021 RacerIn Co. all rights reserved.</p>
                    </form>
                </main>
            </div>
        );
}

export default Signup;