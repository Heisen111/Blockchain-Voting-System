import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { useState } from "react";
import bg from '../assets/bvsBackground.jpg'

export default function Layout() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [contract, setContract] = useState(null);   
  const [factory, setFactory] = useState(null);     

  // pass contract down to whatever page is active
  const renderActiveComponent = () => {
    if (activeComponent === null) return <Home contract={contract} />;
    // clone the active component and inject contract as prop
    return React.cloneElement(activeComponent, { contract, factory, setContract });
  };

  return (
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="relative flex w-full h-full">
        <div className={`fixed h-screen z-20 transition-all duration-300 ${sidebarToggle ? "w-64" : "w-0"}`}>
          <Sidebar
            setActiveComponent={setActiveComponent}
            sidebarToggle={sidebarToggle}
            headerData={contract}          
          />
        </div>
        <div className="flex flex-col w-full">
          <div className={`fixed z-10 transition-all duration-300 ${sidebarToggle ? "left-64 w-[calc(100%-16rem)]" : "left-0 w-full"}`}>
            <Header
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              setContract={setContract}    
              setFactory={setFactory}     
            />
          </div>
          <div className={`flex-1 pt-20 pl-0 transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} overflow-y-auto min-h-screen`}>
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}