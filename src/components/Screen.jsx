import stateImg from "../assets/StateImg.png";
import { useState, useEffect } from 'react';



export default function Screen() {
    const [statesOnScreen, SetStatesOnScreen] = useState([]);


    useEffect(() => {
        const addState = (event) => {
            if (event.key == "p") {
                const newImage = stateImg;
                SetStatesOnScreen([...statesOnScreen, newImage]);
            }
        };
    
        // Listen for any key press
        window.addEventListener('keydown', addState);
    
        // Cleanup event listener when component unmounts
        return () => {
          window.removeEventListener('keydown', addState);
        };
      }, [statesOnScreen]);



    return (
        <div className="flex justify-center items-center h-[90vh] w-[95vw]" id="MonitorWidgetHolder">

            {statesOnScreen.map((img, index) => (
                <img key={index} src={img} className="w-stateSize h-stateSize" alt="State Image" />
            ))}
        </div>
    );
}
