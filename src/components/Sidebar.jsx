import { useState } from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Registration from "./Registration";
import Election from "./Election";
import Results from "./Results";
export default function Sidebar({ setActiveComponent, sidebarToggle, headerData  }) {
  
  const sidebarItems =[
    {id:1, name:"Home", component: <Home/>},
    {id:2, name:"Dashboard", component: <Dashboard/>},
    {id:3, name:"Registration", component: <Registration contract={headerData}/>},
    {id:4, name:"Election", component: <Election contract={headerData}/>},
    {id:5, name:"Results", component: <Results contract={headerData}/>}
  ]
 

  return (
    
   
    <div className={`w-64 border-2 border-highlight text-accent p-4 h-screen  ${sidebarToggle ? "block" : "hidden"}`}>
      <h2 className="flex text-2xl font-bold mb-4 justify-center">Menu</h2>
      <ul className=" flex flex-col items-center ">
        {sidebarItems.map((item) =>(
          <li key={item.id} className="p-2 hover:text-highlight cursor-pointer text-lg" onClick={()=> setActiveComponent(item.component)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
   
   
  )
}
