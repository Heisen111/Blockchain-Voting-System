import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import FACTORY_ABI from '../factoryAbi.json';
import VOTING_ABI from '../votingAbi.json';

const FACTORY_ADDRESS = '0xa773A60C36D0C387bBfb0f3af6B4e11bc771a17a';

export default function Header({ sidebarToggle, setSidebarToggle, setContract, setFactory }) {
  const [account, setAccount] = useState(null);

  const initializeWeb3 = async () => {
    if (!window.ethereum) return console.error("MetaMask not installed");
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
      if (setFactory) setFactory(factoryContract);

      try {
        const latestAddress = await factoryContract.getLatestVoting();
        const votingContract = new ethers.Contract(latestAddress, VOTING_ABI, signer);
        if (setContract) setContract(votingContract);
      } catch {
        if (setContract) setContract(null);
      }

      localStorage.setItem('isWalletConnected', 'true');
      setAccount(userAddress);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum && localStorage.getItem('isWalletConnected') === 'true') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) initializeWeb3();
        else localStorage.removeItem('isWalletConnected');
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <nav className='flex items-center justify-between p-4 h-16 m-2 bg-header'>
      <div
        className='text-accent flex items-center justify-between text-2xl cursor-pointer'
        onClick={() => setSidebarToggle && setSidebarToggle(!sidebarToggle)}
      >
        ☰
        <a href="#" className='text-highlight font-bold text-2xl md:text-4xl px-4 py-1'>
          BVS
        </a>
      </div>
      <div className='flex items-center gap-4 md:gap-6 px-4 py-1'>
        <button
          onClick={initializeWeb3}
          className='text-accent border-highlight border-2 px-3 py-2 rounded-md text-sm md:text-base'
        >
          Connect Wallet
        </button>
        <div className='text-accent text-sm md:text-lg'>
          Account: {account ? `${account.slice(0, 4)}....${account.slice(-4)}` : 'Not Connected'}
        </div>
      </div>
    </nav>
  );
}