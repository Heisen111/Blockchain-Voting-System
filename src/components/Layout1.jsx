import React from 'react'
import Header from './Header'
import Intro from './Intro'
import bg from '../assets/bvsBackground.jpg'

export default function Layout1({componentVisible, setComponentVisible}) {
  return (
    <div className={`h-screen flex flex-col bg-cover bg-center bg-fixed  {componentVisible? "block" : "hidden"}`} style={{ backgroundImage: `url(${bg})` }} >
        <Header/>
        <Intro  componentVisible={componentVisible} setComponentVisible={setComponentVisible}/>
    </div>
  )
}
