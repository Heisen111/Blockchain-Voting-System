import React, { useEffect, useState } from 'react';

export default function Dashboard({ contract }) {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [electionEnded, setElectionEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!contract) return;
    try {
      const allCandidates = await contract.getAllCandidates();
      const formatted = allCandidates.map(c => ({
        id: Number(c.id),
        name: c.name,
        voteCount: Number(c.voteCount),
      }));
      setCandidates(formatted);
      setTotalVotes(formatted.reduce((sum, c) => sum + c.voteCount, 0));

      const deployTime = Number(await contract.deployTime());
      const votingPeriod = Number(await contract.votingPeriod());
      const now = Math.floor(Date.now() / 1000);
      setElectionEnded(now > deployTime + votingPeriod);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!contract) return;
    fetchData();

    const interval = setInterval(async () => {
      try {
        const deployTime = Number(await contract.deployTime());
        const votingPeriod = Number(await contract.votingPeriod());
        const endTime = deployTime + votingPeriod;
        const now = Math.floor(Date.now() / 1000);
        const diff = endTime - now;

        if (diff <= 0) {
          setElectionEnded(true);
          setTimeRemaining('00:00:00');
        } else {
          const h = Math.floor(diff / 3600);
          const m = Math.floor((diff % 3600) / 60);
          const s = diff % 60;
          setTimeRemaining(
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
          );
          setElectionEnded(false);
        }

        const allCandidates = await contract.getAllCandidates();
        const formatted = allCandidates.map(c => ({
          id: Number(c.id),
          name: c.name,
          voteCount: Number(c.voteCount),
        }));
        setCandidates(formatted);
        setTotalVotes(formatted.reduce((sum, c) => sum + c.voteCount, 0));
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contract]);

  const maxVotes = candidates.length > 0 ? Math.max(...candidates.map(c => c.voteCount)) : 0;

  if (!contract) {
    return (
      <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
        <p className="text-accent text-xl">Please connect your wallet to view the dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
        <p className="text-accent text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2 text-center">Live Dashboard</h1>
      <p className="text-accent/60 text-center text-sm mb-6">
        {electionEnded
          ? 'Election has ended. Visit Results page for the final declaration.'
          : 'Live monitoring — updates every second during the election.'}
      </p>

      {/* ── Election Ended Banner ── */}
      {electionEnded && (
        <div className="border-2 border-highlight rounded-lg p-4 mb-6 text-center">
          <p className="text-accent text-lg">
            Election has ended. View the official declaration on the{' '}
            <span className="text-highlight font-semibold">Results</span> page.
          </p>
        </div>
      )}

      {/* ── Stats Cards ── */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 mb-8 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Total Candidates</h3>
            <p className="text-lg md:text-xl text-accent mt-2">{candidates.length}</p>
          </div>

          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Total Votes Cast</h3>
            <p className="text-lg md:text-xl text-accent mt-2">{totalVotes}</p>
          </div>

          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Time Remaining</h3>
            <p className={`text-lg md:text-xl mt-2 font-mono ${electionEnded ? 'text-accent' : 'text-highlight'}`}>
              {electionEnded ? 'Ended' : timeRemaining}
            </p>
          </div>

          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Election Status</h3>
            <p className={`text-lg md:text-xl mt-2 ${electionEnded ? 'text-accent' : 'text-highlight'}`}>
              {electionEnded ? 'Ended' : '● Active'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Live Leaderboard ── */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-semibold text-accent mb-2 text-center">Live Leaderboard</h2>
        <p className="text-accent/60 text-sm text-center mb-6">Rankings update in real time as votes come in</p>

        {candidates.length === 0 ? (
          <p className="text-accent text-center py-6">No candidates registered yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {[...candidates]
              .sort((a, b) => b.voteCount - a.voteCount)
              .map((candidate, index) => {
                const percentage = totalVotes > 0
                  ? ((candidate.voteCount / totalVotes) * 100).toFixed(1)
                  : 0;
                const barWidth = maxVotes > 0 ? (candidate.voteCount / maxVotes) * 100 : 0;
                const isLeading = candidate.voteCount === maxVotes && maxVotes > 0;

                return (
                  <div key={candidate.id} className="border-b border-highlight/30 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-accent font-bold text-lg">#{index + 1}</span>
                        <span className="text-accent text-lg md:text-xl">{candidate.name}</span>
                        {isLeading && totalVotes > 0 && (
                          <span className="text-xs border border-highlight text-highlight px-2 py-0.5 rounded-full">
                            Leading
                          </span>
                        )}
                      </div>
                      <div className="text-accent text-right">
                        <span className="text-lg font-semibold">{candidate.voteCount}</span>
                        <span className="text-sm ml-1">votes ({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-accent/10 rounded-full h-2">
                      <div
                        className="bg-highlight h-2 rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {!electionEnded && totalVotes === 0 && (
          <p className="text-accent text-center py-4 text-sm">Waiting for first vote...</p>
        )}
      </div>
    </div>
  );
}