import { ethers } from 'ethers';
import '../App.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import tokenAbi from '../erc20abi';

export default function Home() {
    const infuraUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    const [userWallet, setUserWallet] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(0);
    const privateKey = localStorage.getItem("pkey");
    const navigate = useNavigate();
    console.log(privateKey);

    const tokenAddress = "0x4000179CdE51EE6791fbdE68f2f7CF9AE9A15B41"; // Replace with the address of the token you want to display
    const tokenName = "ZIX";
    const myTokenABI = tokenAbi;

    useEffect(() => {
        const fetchTokenBalance = async () => {
            const contract = new web3.eth.Contract(myTokenABI, tokenAddress);
           

            if (userWallet) {
                const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
                const balance = await tokenContract.methods.balanceOf(userWallet.address).call();
                const balanceInToken = web3.utils.fromWei(balance, "ether");
                setTokenBalance(balanceInToken);
            }
        };
        fetchTokenBalance();
    }, [userWallet]);

    useEffect(() => {
        const fetchBalance = async () => {
            if (userWallet) {
                const balance = await web3.eth.getBalance(userWallet.address);
                const balanceInEth = web3.utils.fromWei(balance, "ether");
                document.getElementById("bal").innerHTML = balanceInEth;
            }
        };
        fetchBalance();
    }, [userWallet]);

    const routetosendeth = () => {
        navigate("/send");
    };

    const gocreate = () => {
        navigate("/create");
    };

    const gologin = () => {
        navigate("/login");
    };

    const goSettings = () => {
        navigate("/settings");
    };
    const gohome = () =>{
        navigate("/home");
    }

    useEffect(() => {
        if (privateKey) {
            const account = web3.eth.accounts.wallet.add(privateKey);
            setUserWallet(account);
        }
    }, [privateKey]);

    if (!userWallet) {
        return <div>Loading...</div>;
    }

    const shortenedAddress = `${userWallet.address.substring(0, 5)}...${userWallet.address.substring(userWallet.address.length - 4)}`;

    return (
        <div className='container'>
            <div className="nav-container">
                <nav>
                    <button onClick={gocreate}>Create</button>
                    <button onClick={gologin}>Login</button>
                    <button onClick={goSettings}>Settings</button>
                    <button onClick={gohome}>Home</button>

                </nav>
            </div>
            <div className='address-display'>
                <p className="connected-adrs">Account</p>
                <button className="selected-account" onClick={() => navigator.clipboard.writeText(userWallet.address)}>
                    {shortenedAddress}
                </button>
            </div>
            <div className='value-display'>
                <p className='value' id="bal">{tokenBalance}    {"eth"}</p>
                <p className='value' id="token-bal">{tokenBalance}  {tokenName}</p>
            </div>
            <div className="button-box">
            <button onClick={routetosendeth} className="btn">Send</button>
                    </div>
        </div>
    );
}








/** 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ethers } from 'ethers';
import './pages.css'


export default function Home() {
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    const signer = provider.getSigner();
    const userWallet = new ethers.Wallet(privateKey, provider);
    const privateKey = localStorage.getItem("pkey");
    

    provider.getBalance(userWallet.address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)
        document.getElementById("bal").innerHTML = balanceInEth;
    });
    let navigate = useNavigate();

    let routetosendeth = () =>{
        navigate("/send")
    }
  return (
    <div className='container'>
        <main className='container-inner'>
            <div className='box'>
                <div className='address-display'>
                    <p className='address' id="adrs"><a href="#" onClick={navigator.clipboard.writeText(userWallet.address)}>{userWallet.address}</a></p>
                </div>
                <div className='value-display'>
                    <p className='value'id="bal">0.0</p>
                </div>
                <div className="button-box">
                    <button onClick={routetosendeth} className="btn">Send</button>
                </div>
            </div>

        </main>
    </div>
  )
}
*/
/**
import '../App.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
export default function Home() {
    const infuraUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    const [userWallet, setUserWallet] = useState(null);
    const privateKey = localStorage.getItem("pkey");
    const navigate = useNavigate();
    console.log(privateKey);
    useEffect(() => {
        const fetchBalance = async () => {
            if (userWallet) {
                const balance = await web3.eth.getBalance(userWallet.address);
                const balanceInEth = web3.utils.fromWei(balance, "ether");
                document.getElementById("bal").innerHTML = balanceInEth;
            }
        };
        fetchBalance();
    }, [userWallet]);
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
    useEffect(() => {
        if (privateKey) {
            const account = web3.eth.accounts.wallet.add(privateKey);
            setUserWallet(account);
        }
    }, [privateKey]);

    if (!userWallet) {
        return <div>Loading...</div>;
    }
    const shortenedAddress = `${userWallet.address.substring(0, 5)}...${userWallet.address.substring(userWallet.address.length - 4)}`;
    return (
        <div className='container'>
            <div className="nav-container">
                <nav>
                    <button onClick={gocreate}>Create</button>
                    <button onClick={gologin}>Login</button>
                    <button onClick={goSettings}>Settings</button>
                </nav>
            </div>
                    <div className='address-display'>
                        <p className="connected-adrs">Account</p>
                            <button className="selected-account"  onClick={() => navigator.clipboard.writeText(userWallet.address)}>
                            {shortenedAddress}
                            </button>
                    </div>
                    <div className='value-display'>
                        <p className='value' id="bal">0.0</p>
                    </div>
                    <div className="button-box">
                        <button onClick={routetosendeth} className="btn">Send</button>
                    </div>
        </div>
    );
}
*/