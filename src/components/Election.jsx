import React, { useState, useEffect } from 'react';

export default function Election({ contract }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [votingStatus, setVotingStatus] = useState({});

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);

      const candidates = await contract.getAllCandidates().catch(e => console.log("Error:", e));
      console.log("Candidates:", candidates);



      const candidateList = await contract.getAllCandidates();

      const formattedCandidates = candidateList.map(candidate => ({
        id: candidate.id.toString(),
        name: candidate.name,
        isRegistered: candidate.isRegistered,
        voteCount: candidate.voteCount.toString()
      }));

      setCandidates(formattedCandidates);
    } catch (err) {
      setError(err.message || 'Failed to fetch candidates');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      setVotingStatus(prev => ({ ...prev, [candidateId]: 'voting' }));

      const tx = await contract.vote(candidateId, { gasLimit: 100000 }); // Increase gas
     
      await tx.wait();
      
      
      setVotingStatus(prev => ({ ...prev, [candidateId]: 'success' }));

    } catch (err) {
      setVotingStatus(prev => ({ ...prev, [candidateId]: 'error' }));
      setError('Failed to cast vote');
      console.error('Error voting:', err);
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) return <div className='text-accent text-2xl'>Loading candidates...</div>;
  if (error) return <div className='text-accent text-2xl'>Error: {error}</div>;


  return (
    <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-8 text-center">Election</h1>
  
  <div className="w-full border-2 border-highlight rounded-lg p-6 transition-all duration-300">
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b-2 border-highlight">
            <th className="text-xl md:text-2xl font-semibold text-accent py-4 px-6 text-left">Candidate Name</th>
            <th className="text-xl md:text-2xl font-semibold text-accent py-4 px-6 text-center">Status</th>
            <th className="text-xl md:text-2xl font-semibold text-accent py-4 px-6 text-right">Vote Now</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr 
              key={candidate.id} 
              className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200"
            >
              <td className="py-4 px-6 text-lg md:text-xl text-accent">{candidate.name}</td>
              <td className="py-4 px-6 text-lg md:text-xl text-accent text-center">
                {candidate.isRegistered ? 'Registered' : 'Not Registered'}
              </td>
              <td className="py-4 px-6 text-right">
                <button 
                  onClick={() => handleVote(candidate.id)} 
                  disabled={votingStatus[candidate.id] === 'voting' || !candidate.isRegistered}
                  className={`text-base md:text-lg text-accent px-6 py-2 rounded-md border-2 border-highlight transition-all duration-100 active:scale-95
                    ${candidate.isRegistered
                      ? 'hover:text-xl hover:bg-highlight/20'
                      : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                  {votingStatus[candidate.id] === 'voting'
                    ? 'Voting...'
                    : votingStatus[candidate.id] === 'success'
                      ? 'Voted'
                      : 'Vote'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}
