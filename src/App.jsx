import frame from "./assets/images/Frame 3.0.png"

import Screen from "./components/Screen";

function App() {
  return (
    <div className="bg-[#1e3a29]" id="MainBackground">
      <div className="flex justify-center items-center w-screen h-screen bg-center bg-no-repeat bg-contain image-rendering-pixelated"
        style={{backgroundImage: `url(${frame})`, imageRendering: 'pixelated',}} id="Monitor">
          
        <Screen></Screen>
        
      </div>
    </div>
  );
}

export default App
