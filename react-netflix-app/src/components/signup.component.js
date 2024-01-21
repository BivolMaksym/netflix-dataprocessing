import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './css/signup.css';

export default function signUpComponent() {

    return(
        <div className="signUpForm">
            <h2>Please enter your information</h2>

            <OnSignUp></OnSignUp>
        </div>
    )
}

function OnSignUp() {
    const [formData,setFormData] = useState({
       username:"",
       password:"",
       role:""
    });

    function handleClick(e) {
        axios.post('http://localhost:3000/auth/signup', {
            username:formData.username,
            password:formData.password,
            role:formData.role
        });
    }

    function handleChange(e) {
        const {name,value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]:value,
        }));
    }

    return(
        <div>
            Username:
            <input type="text" value={formData.username} name="username" onChange={handleChange}/>

            Password:
            <input type="password" value={formData.password} name="password" onChange={handleChange}/>

            userRole:
            <input type="text" value={formData.role} name="role" onChange={handleChange}/>

            <button type="submit" onClick={handleClick}>Sign up</button>
            <p>
                Back to the login page{''}
                <Link to='/'>Click here</Link>
            </p>
        </div>
    )
}