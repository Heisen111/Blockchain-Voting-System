import React from 'react'

export default function Home() {
  return (
    <div className="px-5 py-10 max-w-6xl mx-auto min-h-screen">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2 text-center">
        Blockchain Voting System
      </h1>
      <p className="text-accent/60 text-center text-sm mb-10">
        Decentralized. Transparent. Tamper-proof.
      </p>

      {/* Intro */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 md:p-8 mb-8 transition-all duration-300">
        <p className="text-lg md:text-xl text-accent leading-relaxed text-justify">
          This decentralized voting platform is designed for{" "}
          <span className="text-highlight font-semibold">organizational-level elections</span>{" "}
          such as schools, colleges, and companies. Built on the Ethereum blockchain, it
          ensures fair, secure, and transparent voting — without the need for
          any third-party control or centralized authority.
        </p>
      </div>

      {/* Advantages + How It Works */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Advantages */}
        <div className="border-2 border-highlight rounded-lg p-6 hover:bg-accent/5 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-accent mb-4">Key Advantages</h2>
          <div className="flex flex-col gap-3">
            {[
              { title: 'Decentralized', desc: 'No single point of control or failure.' },
              { title: 'Transparent', desc: 'Every vote is publicly verifiable on-chain.' },
              { title: 'Immutable', desc: 'Votes cannot be altered once cast.' },
              { title: 'Automated', desc: 'Results are declared automatically on-chain.' },
              { title: 'Fraud-proof', desc: 'One wallet, one vote — enforced by smart contract.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-highlight/20 pb-3 last:border-0 last:pb-0">
                <span className="text-highlight font-bold text-lg mt-0.5">→</span>
                <p className="text-accent text-base md:text-lg">
                  <span className="font-semibold">{item.title}</span> — {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="border-2 border-highlight rounded-lg p-6 hover:bg-accent/5 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-accent mb-4">How It Works</h2>
          <div className="flex flex-col gap-3">
            {[
              { step: '01', title: 'Admin Setup', desc: 'Admin deploys a new election with a custom voting duration.' },
              { step: '02', title: 'Register Candidates', desc: 'Admin adds candidates by name to the election.' },
              { step: '03', title: 'Register Voters', desc: 'Admin registers eligible voters using their wallet address and unique ID. One ID per voter.' },
              { step: '04', title: 'Cast Vote', desc: 'Registered voters connect their wallet and vote for their preferred candidate — once only.' },
              { step: '05', title: 'Results Declared', desc: 'After the voting period ends, results are automatically available on-chain.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-highlight/20 pb-3 last:border-0 last:pb-0">
                <span className="text-highlight font-bold text-lg font-mono min-w-[2rem]">{item.step}</span>
                <p className="text-accent text-base md:text-lg">
                  <span className="font-semibold">{item.title}</span> — {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Stats Bar */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 mb-8 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { label: 'Blockchain', value: 'Ethereum' },
            { label: 'Network', value: 'Sepolia Testnet' },
            { label: 'Smart Contracts', value: '4 Contracts' },
          ].map((item, i) => (
            <div key={i} className="border-b sm:border-b-0 sm:border-r border-highlight/30 last:border-0 pb-4 sm:pb-0">
              <p className="text-highlight font-bold text-xl md:text-2xl">{item.value}</p>
              <p className="text-accent/60 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="w-full border-2 border-highlight rounded-lg p-6 text-center hover:bg-accent/5 transition-all duration-300">
        <p className="text-lg md:text-xl text-accent leading-relaxed">
          With blockchain, your organization gains a{" "}
          <span className="text-highlight font-semibold">secure, efficient, and transparent</span>{" "}
          way to manage elections — ensuring trust in every single vote.
        </p>
      </div>

    </div>
  );
}