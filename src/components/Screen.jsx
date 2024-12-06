import stateImg from "../assets/images/StateImg.png";
import StateWidget from "./State";
import { useState, useEffect } from 'react';



export default function Screen() {
    const [statesOnScreen, SetStatesOnScreen] = useState([]);
    const [positions, setPositions] = useState({});
    
    useEffect(() => {
        const addState = (event) => {
            if (event.key == "p") {
                const idGenerated = 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000) // Random id
                const NewState = {
                    id: idGenerated,
                    src: stateImg
                };
                SetStatesOnScreen((prevStates) => [...prevStates, NewState]);

                setPositions((prevPositions) => ({
                    ...prevPositions,
                    [idGenerated]: {x: 600, y: 300}, // Default location
                  }));
            }
        };
    
        // Listen for any key press
        window.addEventListener('keydown', addState);
    
        // Cleanup event listener when component unmounts
        return () => {
          window.removeEventListener('keydown', addState);
        };
      }, [statesOnScreen]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const { clientX, clientY } = e;

        const startCoords = JSON.parse(e.dataTransfer.getData("text/plain"));
      
        const offsetX = clientX - startCoords.startX;
        const offsetY = clientY - startCoords.startY;

        const name = startCoords.stateName;
        const oldX = positions[name].x
        const oldY = positions[name].y

        // Update position
        setPositions((prevPositions) => ({
            ...prevPositions,
            [name]: {x: oldX + offsetX, y: oldY + offsetY}, // Change position relative to its screen
          }));
        
        


    };


    return (
        <div className="flex justify-center items-center h-[90vh] w-[95vw]"
         id="MonitorWidgetHolder"
         onDragOver={handleDragOver}
         onDrop={handleDrop}>

            {statesOnScreen.map((state) => (
                <StateWidget key={state.id} state={state} stateName={state.id} position={positions[state.id]}/>
            ))}
        </div>
    );
}
