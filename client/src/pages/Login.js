import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
    const [ loginUser, { error, data } ] = useMutation(LOGIN_USER);

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    const formChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const submitLogin = async (event) => {
        event.preventDefault();

        try {
            const {data} = await loginUser({
                variables: { email: userFormData.email, password: userFormData.password}
            });

            if (!data) {
                throw new Error(error);
            }

            Auth.login(data.loginUser.token)
            console.log("logged in!")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="col-sm-9 text-center mx-auto h-100">
            <div className="card mt-3 w-50 mx-auto shadow-lg" id="loginCard">
                <div>
                    <h1 className="py-5">Login</h1>
                </div>
                <form className="form login-form" onSubmit={submitLogin}>
                    <div className="pb-5 m-4 cardbg">
                    <label htmlFor="email-login" className="form-label">Email:</label>
                    <input className="form-control text-center shadow w-75 mx-auto" type="text" name="email" onChange={formChange} value={userFormData.email} placeholder="name123@example.com"></input>
                    </div>
                    <div className="pb-5 m-4 cardbg">
                    <label htmlFor="password-login" className="form-label">Password:</label>
                    <input className="form-control text-center shadow w-75 mx-auto" type="password" name="password" onChange={formChange} value={userFormData.password}></input>
                    </div>
                    <div className="m-3">
                    <button className="btn btn-primary m-3 shadow" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm