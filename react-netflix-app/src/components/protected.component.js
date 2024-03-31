import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function ProtectedComponent() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        //Make authenticated request to server
        axios.get('http://localhost:3000/auth/protected', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            //Handle succesful response
            setUserData(response.data);
        }).catch(error => {
            setError(error.response.data);
        })
    }, []);

    return (
        <div>
            <h2>Protected Page</h2>
            {userData ? (
                <div>
                    <p>{userData.message}</p>
                    <p>User: {userData.user}</p>
                    <p>Role: {userData.role}</p>
                </div>
            ) : (
                <p>{error || 'Loading...'}</p>
            )}
        </div>
    );
}