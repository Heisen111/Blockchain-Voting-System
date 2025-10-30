import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import ABI from './abi.json'

const contractAddress = '0xb711F251A796aa0BC77931c501d948979ca72009';
const abi = ABI;

export default function Header({sidebarToggle, setSidebarToggle, setHeaderData }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);



  const intializeWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const newSigner = await newProvider.getSigner();
      const newContract = new ethers.Contract(contractAddress, abi, newSigner);
      const userAddress = await newSigner.getAddress();

      localStorage.setItem('isWalletConnected', 'true');

      setProvider(newProvider);
      setSigner(newSigner);
      setContract(newContract);
      setAccount(userAddress);
      setHeaderData(newContract);
      console.log(account);
    } else {
      console.error("MetaMask is not installed!");
    }
  }

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum && localStorage.getItem('isWalletConnected') === 'true') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          intializeWeb3();
        } else {
          localStorage.removeItem('isWalletConnected');
        }
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <>

      <nav className=' flex items-center justify-between p-4  h-16  m-2 bg-header'>
        <div className='text-accent flex  items-center justify-between text-2xl cursor-pointer'  onClick={()=>setSidebarToggle(!sidebarToggle)}>☰
          <a href="#" className='text-highlight font-bold text-2xl md:text-4xl px-4 py-1 '>
            BVS
          </a>
        </div>
        <div className='flex items-center gap-4 md:gap-6 px-4 py-1 '>
          <button
            onClick={intializeWeb3}
            className='text-accent border-highlight border-2 px-3 py-2 rounded-md text-sm md:text-base '
          >
            Connect Wallet
          </button>
          <div className='text-accent text-sm  md:text-lg'>
            Account: {account ? `${account.slice(0, 4)}....${account.slice(-4)}` : 'Not Connected'}
          </div>
        </div>
      </nav>

    </>
  )
}
