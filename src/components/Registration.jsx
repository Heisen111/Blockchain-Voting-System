import { ethers } from 'ethers';
import { useState } from "react";

export default function Registration({ contract }) {
  const [candidate, setCandidate] = useState('');
  const [voter, setVoter] = useState('');
  const [id, setId] = useState('');

  const addCandidateWeb2 = async () => {
    if (!contract) {
      alert('Contract not initialized. Please ensure MetaMask is connected.');
      return;
    }
    try {
      const tx = await contract.addCandidate(candidate);
      await tx.wait();
      alert('Candidate added successfully!');
    } catch (err) {
      alert('Error adding candidate: ' + err.message);
    }
  }

  const addVoterWeb2 = async () => {
    if (!contract) {
      alert('Contract not initialized. Please ensure MetaMask is connected.');
      return;
    }
    if (!voter || id === '') {
      alert('Please fill in both voter address and ID.');
      return;
    }
    try {

      const tx = await contract.addVoter(voter, id);
      await tx.wait();
      alert('Voter added successfully!');
      setVoter('');
      setId('');
    } catch (err) {
      alert('Error adding Voter: ' + err.message);
    }
  };
  return (
    <div className="px-5 py-8 max-w-4xl mx-auto">
    <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-8 text-center">Registration</h1>
    
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Candidate Section */}
      <div className="w-full md:w-1/2 border-2 border-highlight rounded-lg  p-6 flex flex-col items-center gap-6 transition-all duration-300 ">
        <h2 className="text-xl md:text-2xl font-semibold text-accent">Candidate</h2>
        
        <div className="w-full max-w-sm">
          <label className="text-lg md:text-xl font-light text-accent block mb-2">
            Add a Candidate
          </label>
          <hr className="border-highlight mb-3"/>
          <input 
            type="text" 
            value={candidate} 
            onChange={(e) => setCandidate(e.target.value)} 
            placeholder="Enter Name" 
            className="w-full px-3 py-2 border-2 border-accent text-accent rounded-md focus:outline-none focus:border-highlight transition-colors duration-200 hover:border-highlight"
          />
        </div>
        
        <button 
          className="text-base md:text-lg  text-accent px-6 py-2 rounded-md  hover:text-xl border-2 border-highlight transition-all duration-100 active:scale-95"
          onClick={(e) => addCandidateWeb2(e)}
        >
          Add Candidate
        </button>
      </div>
  
      {/* Voter Section */}
      <div className="w-full md:w-1/2  border-2 border-highlight rounded-lg  p-6 flex flex-col items-center gap-6 transition-all duration-300 ">
        <h2 className="text-xl md:text-2xl font-semibold text-accent">Voter</h2>
        
        <div className="w-full max-w-sm space-y-5">
          <div>
            <label className="text-lg md:text-xl font-light text-accent block mb-2">
              Add a Voter
            </label>
            <hr className="border-highlight mb-3"/>
            <input 
              type="text" 
              value={voter} 
              onChange={(e) => setVoter(e.target.value)} 
              placeholder="Enter Address (0x...)" 
              className="w-full px-3 py-2 border-2 border-accent text-accent rounded-md focus:outline-none focus:border-highlight transition-colors duration-200 hover:border-highlight"
            />
          </div>
          
          <div>
            <label className="text-lg md:text-xl font-light text-accent block mb-2">
              Voter ID
            </label>
            <hr className="border-highlight mb-3"/>
            <input 
              type="number" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              placeholder="Enter Id" 
              className="w-full px-3 py-2 border-2 border-accent text-accent rounded-md focus:outline-none focus:border-highlight transition-colors duration-200 hover:border-highlight"
            />
          </div>
        </div>
        
        <button 
          className="text-base md:text-lg text-accent px-6 py-2 rounded-md hover:text-xl border-2 border-highlight transition-all duration-100 active:scale-95"
          onClick={addVoterWeb2}
        >
          Add Voter
        </button>
      </div>
    </div>
  </div>
  )
}
