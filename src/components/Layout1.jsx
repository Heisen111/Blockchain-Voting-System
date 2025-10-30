import React from 'react'
import Header from './Header'
import Intro from './Intro'

export default function Layout1({componentVisible, setComponentVisible}) {
  return (
    <div className={`h-screen flex flex-col bg-cover bg-center bg-fixed  {componentVisible? "block" : "hidden"}`} style={{ backgroundImage: "url('/src/assets/bvsBackground.jpg')" }} >
        <Header/>
        <Intro  componentVisible={componentVisible} setComponentVisible={setComponentVisible}/>
    </div>
  )
}
