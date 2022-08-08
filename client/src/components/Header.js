import React, { useState } from 'react';
import '../pages/style.css';

import Auth from '../utils/auth';

function Header() {
    return (
        <header className="header container-fluid mb-3 text-white text-center">
        <div className="row">
            <div className="col-12 text-center "id="headSctn">
            <h1 className="p-4">What's for Dinner?</h1>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                        <button type="button" onClick={Auth.logout} className="btn btn-primary m-3">Logout</button>
                        </>
                    ) : (
                        <>
                        <a href="/signup"><button type="button" className="btn btn-primary m-3" id="registerbtn">Register</button></a>
                        <a href="/login"><button type="button" className="btn btn-primary m-3" id="loginbtn">Login</button></a>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header