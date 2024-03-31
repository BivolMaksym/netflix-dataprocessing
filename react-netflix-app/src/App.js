import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from "./components/login.component";
import SignupComponent from "./components/signup.component";
import {useState} from "react";
import ProtectedComponent from "./components/protected.component";

function App() {
    const [token, setToken] = useState('');
    const handleLogin = (token) => {
        setToken(token);
    };

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginComponent onLogin={handleLogin}/>}/>
                    <Route  path="/signup" element={<SignupComponent/>}/>
                    <Route path="/protected" element={<ProtectedComponent/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
