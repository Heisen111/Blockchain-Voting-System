import React from 'react'

export default function Home() {
  return (
    <div className="px-5 py-10 max-w-6xl mx-auto min-h-screen">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 md:mb-10 text-center">
        Blockchain Voting System
      </h1>

      {/* Intro / Overview */}
      <div className="w-full border-2 border-highlight rounded-2xl p-6 md:p-8 mb-10 shadow-sm hover:shadow-md transition-all duration-300">
        <p className="text-lg md:text-xl text-accent leading-relaxed text-justify">
          This decentralized voting platform is designed for{" "}
          <span className="font-semibold">organizational-level elections</span>{" "}
          such as schools, colleges, and companies. Built on blockchain, it
          ensures fair, secure, and transparent voting without the need for
          third-party control.
        </p>
      </div>

      {/* Advantages + Guidelines */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Advantages Section */}
        <div className="border-2 border-highlight rounded-2xl p-6 hover:bg-accent/5 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-accent mb-3">
            Key Advantages
          </h2>
          <ul className="list-disc list-inside space-y-2 text-accent text-lg md:text-xl">
            <li>Decentralization – no single point of control.</li>
            <li>Transparency – results can be verified by anyone.</li>
            <li>Security – votes are immutable once cast.</li>
            <li>Time-saving – automated tallying of results.</li>
            <li>Fair – prevents duplicate or fraudulent voting.</li>
          </ul>
        </div>

        {/* Guidelines Section */}
        <div className="border-2 border-highlight rounded-2xl p-6 hover:bg-accent/5 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-accent mb-3">
            How It Works
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-accent text-lg md:text-xl">
            <li>
              An <span className="font-semibold">Admin</span> (from the
              organization) must first set up the election.
            </li>
            <li>
              Admin registers <span className="font-semibold">Candidates</span>{" "}
              by their names.
            </li>
            <li>
              Admin registers <span className="font-semibold">Voters</span>{" "}
              using their EVM wallet address and unique organizational ID.
              <br />
              ⚠️ Only one voter can be registered per ID.
            </li>
            <li>
              Once registration is complete,{" "}
              <span className="font-semibold">voting begins</span>.
            </li>
            <li>
              Each voter can vote only{" "}
              <span className="font-semibold">once</span> for their preferred
              candidate.
            </li>
            <li>
              After the voting period ends,{" "}
              <span className="font-semibold">results are automatically
              declared</span>.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer Note */}
      <div className="w-full border-2 border-highlight rounded-2xl p-6 text-center hover:bg-accent/5 transition-all duration-300">
        <p className="text-lg md:text-xl text-accent leading-relaxed">
          With blockchain, your organization gains a{" "}
          <span className="font-semibold">secure, efficient, and transparent</span>{" "}
          way to manage elections, ensuring trust in every vote.
        </p>
      </div>
    </div>
  );
}
