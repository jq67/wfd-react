import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations'

import Auth from '../utils/auth';

const SignupForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  
    const formChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const [ addUser, { error, data } ] = useMutation(CREATE_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });
  
        if (!data) {
          throw new Error('something went wrong!');
        }
  
        Auth.login(data.createUser.token);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div className="col-sm-9 mx-auto h-100 text-center">
          <div className="card mt-3 w-50 mx-auto shadow-lg" id="registerCard">
              <div>
                  <h1 className="py-5">Register</h1>
              </div>
              <form className="form signup-form" onSubmit={handleFormSubmit}>
                  <div className="pb-3 m-4 cardbg">
                      <label htmlFor="username-signup" className="form-label">Username</label>
                      <input className="form-control text-center shadow w-75 mx-auto" type="text" id="username-signup"></input>
                  </div>
                  <div className="pb-3 m-4 cardbg">
                      <label htmlFor="email-signup" className="form-label">Email</label>
                      <input className="form-control text-center shadow w-75 mx-auto"type="text" id="email-signup" onChange={formChange}></input>
                  </div>
                  <div className="pb-3 m-4 cardbg">
                      <label htmlFor="password-signup" className="form-label">Password</label>
                      <input className="form-control text-center shadow w-75 mx-auto" type="password" id="password-signup" onChange={formChange}></input>
                  </div>
                  <div className="pb-3 m-4">
                      <button className="btn btn-primary shadow" type="submit">Register</button>
                  </div>
              </form>      
          </div>
      </div>
    );
  };
  
  export default SignupForm;