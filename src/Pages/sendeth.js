import React from 'react';
import {ethers} from 'ethers'
import Web3 from 'web3';
import { useNavigate } from "react-router-dom";

export default function Sendeth() {
  let navigate = useNavigate();    

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

  //const [userWallet, setUserWallet] = useState(null);
  const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
  //const signer = provider.getSigner();
  const userWallet = new ethers.Wallet(localStorage.getItem("pkey"),provider);
  const send = () => {

    let toadrs= document.getElementById('toadrs').value
    let amount = document.getElementById('val').value
    let tx ={
      to: toadrs,
      value: ethers.utils.parseEther(amount)
    }
    userWallet.sendTransaction(tx).then((txhash) => {
      console.log(txhash);
    })
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="nav-container">
                <nav>
                    <button onClick={gocreate}>Create</button>
                    <button onClick={gologin}>Login</button>
                    <button onClick={goSettings}>Settings</button>
                    <button onClick={goHome}>Home</button>
                </nav>
            </div>
        <main className='container mx-auto w-screen h-screen lg:max-w-screen-lg flex-1'>
            <div className='shadow-md shadow-slate-200 content-center flex-row items-center justify-center'>
                <div className="flex content-center align-middle justify-center p-4">
                    <input id="val" type="number" className="p-3"/><p>to</p><input id="toadrs" className="sendfields"/>
                    <div className="content-center align-middle justify-center p-4">
                    <button onClick={send} className="btn">Button-send</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

