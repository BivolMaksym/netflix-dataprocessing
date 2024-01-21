import React, {useState} from 'react';
import axios from 'axios';
import './css/login.css';
import {Link} from "react-router-dom";

export default function loginComponent() {

    return (
        <div className="loginForm">
            <h2>Login please</h2>

            <OnLogin></OnLogin>
        </div>
    );

}

function OnLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // const [password, setPassword] = useState("");

    function handleClick(e) {
        axios.post('http://localhost:3000/auth/login', {
            username: formData.username,
            password: formData.password
        });
    }

    function handleChange(e) {

        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div>
            Username:
            <input type="text" value={formData.username} name="username" onChange={handleChange}/>

            Password:
            <input type="password" value={formData.password} name="password" onChange={handleChange}/>

            <button type="submit" onClick={handleClick}>Login</button>

            <p>
                Don't have an account yet?{''}
                <Link to='/signup'>Sign up here</Link>
            </p>
        </div>
    );
}
