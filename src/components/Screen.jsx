/* eslint-disable no-unused-vars */
import stateImg from "../assets/StateImg.png";
import StateWidget from "./State";
import { useState, useEffect } from 'react';



export default function Screen() {
    const [statesOnScreen, SetStatesOnScreen] = useState([]);
    const [positions, setPositions] = useState({});
    
    useEffect(() => {
        const addState = (event) => {
            if (event.key == "p") {
                const NewState = {
                    id: statesOnScreen.length + 1,
                    src: stateImg
                };
                SetStatesOnScreen((prevStates) => [...prevStates, NewState]);
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
        e.preventDefault(); // Prevent default behavior to allow the drop
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const startCoords = JSON.parse(e.dataTransfer.getData("text/plain"));
        
    };


    return (
        <div className="flex justify-center items-center h-[90vh] w-[95vw]"
         id="MonitorWidgetHolder"
         onDragOver={handleDragOver}
         onDrop={handleDrop}>



            {statesOnScreen.map((state) => (
                <StateWidget key={state.id} state={state} />
            ))}
        </div>
    );
}
