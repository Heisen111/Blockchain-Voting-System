import React, { useState, useEffect } from 'react';


export default function Results({ contract }) {
  const [results, setResults] = useState({ names: [], counts: [] });
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const fetchResults = async () => {
    try{
    setLoading(true);
    setIsWaiting(false);

    const [candidateNames, voteCount] = await contract.result();

    setResults({
      names: candidateNames,
      counts: voteCount.map(count => count.toString()),
    })
    } catch (err) {
      
      if (err.message.includes('afterVotingEnds') || err.message.includes('revert')) {
        setIsWaiting(true); 
      } else {
        console.error('Error fetching results:', err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResults();
  }, [contract]); 

 
  if (loading) {
    return <div className="text-accent text-2xl">Loading results...</div>;
  }

  
  if (isWaiting) {
    return (
      <div className="text-accent text-2xl">
        <h2>Election Results</h2>
        <p>Please wait! Results will be available after the voting period ends.</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
  <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-8 text-center">Election Results</h1>
  
  <div className="w-full border-2 border-highlight rounded-lg p-6 transition-all duration-300">
    {results.names.length === 0 ? (
      <p className="text-lg md:text-xl text-accent text-center py-10">No results available yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b-2 border-highlight">
              <th className="text-xl md:text-2xl font-semibold text-accent py-4 px-6 text-left">Candidate Name</th>
              <th className="text-xl md:text-2xl font-semibold text-accent py-4 px-6 text-right">Votes</th>
            </tr>
          </thead>
          <tbody>
            {results.names.map((name, index) => (
              <tr 
                key={index} 
                className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200"
              >
                <td className="py-4 px-6 text-lg md:text-xl text-accent">{name}</td>
                <td className="py-4 px-6 text-lg md:text-xl text-accent text-right">{results.counts[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
  )
}
