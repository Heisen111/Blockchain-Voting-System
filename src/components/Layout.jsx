import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { useState } from "react";

export default function Layout() {
  const [activeComponent, setActiveComponent] = useState(<Home />);
  const [sidebarToggle, setSidebarToggle] = useState(true); 
  const [headerData, setHeaderData] = useState(null); 

  return (
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: "url('/src/assets/bvsBackground.jpg')" }}>
      <div className="relative flex w-full h-full">
        <div className={`fixed h-screen z-20 transition-all duration-300 ${sidebarToggle ? "w-64" : "w-0"}`}>
          <Sidebar setActiveComponent={setActiveComponent} sidebarToggle={sidebarToggle} headerData={headerData}/>
        </div>
        <div className="flex flex-col w-full">
          <div className={`fixed z-10 transition-all duration-300 ${sidebarToggle ? "left-64 w-[calc(100%-16rem)]" : "left-0 w-full"}`}>
            <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} setHeaderData={setHeaderData}/>
          </div>
          <div className={`flex-1 pt-20 pl-0 transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} overflow-y-auto min-h-screen`}>
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
}