import { useNavigate } from "react-router-dom";

export default function ({componentVisible, setComponentVisible}) {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 ">
    <h1 className="text-4xl md:text-5xl font-extrabold text-highlight mb-4 ">Vote with Confidence</h1>
    <p className="text-base md:text-lg text-accent max-w-xl mb-6">
      Experience secure, transparent, and tamper-proof elections powered by blockchain technology. Your voice matters, and every vote counts.
    </p>
    <button  
      className="bg-highlight  px-5 py-2 text-base md:text-lg font-semibold rounded-md shadow-md " onClick={()=>setComponentVisible(!componentVisible)}
    >
      Explore Now
    </button>
  </div>
);
  
}
