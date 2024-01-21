import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from "./components/login.component";
import SignupComponent from "./components/signup.component";
import {useState} from "react";

function App() {
    const [token, setToken] = useState('');

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginComponent/>}/>
                    <Route  path="/signup" element={<SignupComponent/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
