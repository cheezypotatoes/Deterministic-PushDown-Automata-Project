import frame from "./assets/Frame 3.0.png"
import starting from "./assets/StateImg.png"

function App() {
  return (
    <div className="bg-[#1e3a29]" id="MainBackground">
      <div className="flex justify-center items-center w-screen h-screen bg-center bg-no-repeat bg-contain image-rendering-pixelated"
        style={{backgroundImage: `url(${frame})`, imageRendering: 'pixelated',}} id="Monitor">
      
        <div className="flex justify-center items-center h-[90vh] w-[95vw]" id="MonitorWidgetHolder">
          <img src={starting} className="w-stateSize h-stateSize" alt="State Image" />

        </div>
        
      </div>
    </div>
  );
}

export default App
