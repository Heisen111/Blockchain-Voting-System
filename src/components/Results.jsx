import React, { useState, useEffect } from 'react';

export default function Results({ contract }) {
  const [results, setResults] = useState({ names: [], counts: [] });
  const [loading, setLoading] = useState(true);
  const [electionOngoing, setElectionOngoing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!contract) return;
    checkAndFetch();
  }, [contract]);

  const checkAndFetch = async () => {
    try {
      const deployTime = Number(await contract.deployTime());
      const votingPeriod = Number(await contract.votingPeriod());
      const now = Math.floor(Date.now() / 1000);
      const endTime = deployTime + votingPeriod;

      if (now <= endTime) {
        // election still ongoing — show countdown
        setElectionOngoing(true);
        setLoading(false);
        startCountdown(endTime);
        return;
      }

      // election ended — fetch results
      const [candidateNames, voteCounts] = await contract.result();
      setResults({
        names: candidateNames,
        counts: voteCounts.map(c => Number(c)),
      });
      setElectionOngoing(false);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching results:', err);
      setLoading(false);
    }
  };

  const startCountdown = (endTime) => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const diff = endTime - now;
      if (diff <= 0) {
        clearInterval(interval);
        setElectionOngoing(false);
        checkAndFetch();
        return;
      }
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeRemaining(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      );
    }, 1000);
  };

  // winner = highest votes
  const winnerIndex = results.counts.length > 0
    ? results.counts.indexOf(Math.max(...results.counts))
    : -1;

  const totalVotes = results.counts.reduce((sum, c) => sum + c, 0);
  const maxVotes = results.counts.length > 0 ? Math.max(...results.counts) : 0;

  if (!contract) {
    return (
      <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
        <p className="text-accent text-xl">Please connect your wallet to view results.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
        <p className="text-accent text-xl">Loading results...</p>
      </div>
    );
  }

  // election still ongoing
  if (electionOngoing) {
    return (
      <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-8 text-center">Election Results</h1>
        <div className="w-full border-2 border-highlight rounded-lg p-10 flex flex-col items-center gap-6 transition-all duration-300">
          <p className="text-accent text-xl text-center">Election is currently ongoing.</p>
          <p className="text-accent/60 text-center">Results will be available once the voting period ends. Check the Dashboard for live updates.</p>
          <div className="text-center mt-2">
            <p className="text-accent text-sm mb-1">Time remaining</p>
            <p className="text-highlight font-mono text-4xl font-bold">{timeRemaining}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2 text-center">Election Results</h1>
      <p className="text-accent/60 text-center text-sm mb-8">Official final declaration — voting period has ended</p>

      {/* ── Winner Banner ── */}
      {winnerIndex !== -1 && (
        <div className="w-full border-2 border-highlight rounded-lg p-8 mb-8 text-center transition-all duration-300">
          <p className="text-accent text-lg mb-1">Winner</p>
          <p className="text-highlight text-4xl md:text-5xl font-bold mt-2">
            {results.names[winnerIndex]}
          </p>
          <p className="text-accent mt-3">
            {results.counts[winnerIndex]} votes out of {totalVotes} total
            {' '}({totalVotes > 0 ? ((results.counts[winnerIndex] / totalVotes) * 100).toFixed(1) : 0}%)
          </p>
        </div>
      )}

      {/* ── Full Results Table with bars ── */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-semibold text-accent mb-6 text-center">Full Breakdown</h2>

        {results.names.length === 0 ? (
          <p className="text-accent text-center py-6">No results available.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {results.names
              .map((name, i) => ({ name, count: results.counts[i], index: i }))
              .sort((a, b) => b.count - a.count)
              .map((candidate, rank) => {
                const percentage = totalVotes > 0
                  ? ((candidate.count / totalVotes) * 100).toFixed(1)
                  : 0;
                const barWidth = maxVotes > 0 ? (candidate.count / maxVotes) * 100 : 0;
                const isWinner = candidate.index === winnerIndex;

                return (
                  <div key={candidate.index} className="border-b border-highlight/30 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-accent font-bold text-lg">#{rank + 1}</span>
                        <span className="text-accent text-lg md:text-xl">{candidate.name}</span>
                        {isWinner && (
                          <span className="text-xs border border-highlight text-highlight px-2 py-0.5 rounded-full">
                            Winner
                          </span>
                        )}
                      </div>
                      <div className="text-accent text-right">
                        <span className="text-lg font-semibold">{candidate.count}</span>
                        <span className="text-sm ml-1">votes ({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-accent/10 rounded-full h-3">
                      <div
                        className="bg-highlight h-3 rounded-full transition-all duration-700"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-highlight/30 text-center">
          <p className="text-accent text-sm">Total votes cast: <span className="text-highlight font-semibold">{totalVotes}</span></p>
        </div>
      </div>
    </div>
  );
}