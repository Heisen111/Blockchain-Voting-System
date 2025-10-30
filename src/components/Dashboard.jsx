import React from 'react';

export default function Dashboard() {
  return (
    <div className="px-5 py-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-8 text-center">Dashboard</h1>
      
      <div className="w-full border-2 border-highlight rounded-lg p-6 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total Voters Card */}
          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Total Voters</h3>
            <p className="text-lg md:text-xl text-accent mt-2">38</p>
          </div>

          {/* Total Candidates Card */}
          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Total Candidates</h3>
            <p className="text-lg md:text-xl text-accent mt-2">5</p>
          </div>

          {/* % Voting Done Card */}
          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Voter Participation Rate

</h3>
            <p className="text-lg md:text-xl text-accent mt-2">100%</p>
          </div>

          {/* Election Ended Card */}
          <div className="border-b border-highlight/50 hover:bg-accent/5 transition-all duration-200 p-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">Election Ended</h3>
            <p className="text-lg md:text-xl text-accent mt-2">Yes</p>
          </div>
        </div>
        <p className="text-lg md:text-xl text-accent text-center py-10">Waiting for final results...</p>
      </div>
    </div>
  );
}