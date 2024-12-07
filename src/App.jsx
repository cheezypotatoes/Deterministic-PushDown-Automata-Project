/* eslint-disable no-unused-vars */
import frame from "./assets/images/Frame 3.0.png"
import Screen from "./components/Screen";
import InputPopUp from "./components/InputPopUp";
import { useState } from 'react';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true)
  }

  function CloseModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="bg-[#1e3a29]" id="MainBackground">
      
      <div className="flex justify-center items-center w-screen h-screen bg-center bg-no-repeat bg-contain image-rendering-pixelated"
        style={{backgroundImage: `url(${frame})`, imageRendering: 'pixelated',}} id="Monitor">
          
        <Screen showModal={showModal} CloseModal={CloseModal} isModalOpen={isModalOpen}/>
        
       
        
      </div>
    </div>
  );
}

export default App
