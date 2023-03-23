import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
export default function Settings() {
    const navigate = useNavigate();
    const routetosendeth = () => {
        navigate("/send");
    };
    const gocreate = () =>{
        navigate("/create");
    }
    const gologin = () =>{
        navigate("/login");
    }
    const goSettings = () =>{
        navigate("/settings");
    }
    const goHome = () =>{
        navigate("/home");
    }
    const [showSecretKey, setShowSecretKey] =useState(false);
    const [showMnemonic, setShowMnemonic] = useState(false);
    return (
        <div className='container'>
            <div className="nav-container">
                <nav>
                    <button onClick={gocreate}>Create</button>
                    <button onClick={gologin}>Login</button>
                    <button onClick={goSettings}>Settings</button>
                    <button onClick={goHome}>Home</button>
                </nav>
            </div>
            <div className="showhide">
            <div className="settings-menu">
                {/* Toggle the visibility of the secret key when the button is clicked */}
                <button onClick={() => setShowSecretKey(!showSecretKey)}>
                    {showSecretKey ? "Hide" : "Show"} secret key
                </button>
                {/* Only display the secret key if the showSecretKey state is true */}
                {showSecretKey && <p className="key">{localStorage["pkey"]}</p>}
                <button  onClick={() => setShowMnemonic(!showMnemonic)}>
                    {showMnemonic ? "Hide" : "Show"} recovery phrase 
                </button>
                {showMnemonic && <p className="key">{localStorage["mnem"]}</p>}
            </div>
            </div>
        </div>
    );
}
