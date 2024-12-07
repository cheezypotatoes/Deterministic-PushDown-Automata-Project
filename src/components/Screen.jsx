import stateImg from "../assets/images/StateImg.png";
import StateWidget from "./State";
import PropTypes from 'prop-types';
import InputPopUp from "./InputPopUp";

import { useState, useEffect } from 'react';



export default function Screen({showModal, CloseModal, isModalOpen}) {
    const [statesOnScreen, SetStatesOnScreen] = useState([]);
    const [positions, setPositions] = useState({});
    

    
    useEffect(() => {


        setPositions((prevPositions) => ({
            ...prevPositions,
            ["modal"]: {x: 600, y: 100}, // Default location
          }));


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

        // Calculate new position
        let newX = oldX + offsetX;
        let newY = oldY + offsetY;

        // If it's the modal, constrain it to a smaller range (example: inside a specific area)
        if (name === "modal") {
            const containerWidth = window.innerWidth * 0.9;  // 90% of viewport width
            const containerHeight = window.innerHeight * 0.6; // 60% of viewport height

            const containerLeftOffset = (window.innerWidth - containerWidth) / 2; // Left margin of the container
            const containerTopOffset = (window.innerHeight - containerHeight) / 2; // Top margin of the container

            const modalWidth = 300;  // Width of the modal
            const modalHeight = 200; // Height of the modal
            const padding = 20;      // Normal padding from edges
            const bottomPadding = 50; // Extra padding when near the bottom
            const topPadding = 10;   // Reduced padding when near the top

            // Constrain X to keep the modal within container horizontally
            newX = Math.max(
                containerLeftOffset + padding, 
                Math.min(containerLeftOffset + containerWidth - modalWidth - padding, newX)
            );

            // Check if we're placing near the bottom and apply extra bottom padding, or apply reduced top padding
            const verticalPadding = (newY + modalHeight + padding) > (containerTopOffset + containerHeight) 
                ? bottomPadding // Add extra bottom padding if near bottom
                : topPadding;   // Use reduced top padding if not near the bottom

            // Constrain Y to keep the modal within container vertically, with adjusted padding
            newY = Math.max(
                containerTopOffset + verticalPadding, 
                Math.min(containerTopOffset + containerHeight - modalHeight - verticalPadding, newY)
            );
        }

        
            

        // Update position
        setPositions((prevPositions) => ({
            ...prevPositions,
            [name]: { x: newX, y: newY },
        }));
    };


    return (
        <>

            <div className="flex justify-center items-center h-[80vh] w-[90vw]"
            id="MonitorWidgetHolder"
            style={{ userSelect: 'none' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>

                {statesOnScreen.map((state) => (
                    <StateWidget 
                    key={state.id} 
                    state={state} 
                    stateName={state.id} 
                    position={positions[state.id]}
                    showModal={showModal}
                    CloseModal={CloseModal}
                    isModalOpen={isModalOpen}/>
                ))}

                <InputPopUp 
                position={positions["modal"]}
                isOpen={isModalOpen}
                setPositions={setPositions}/>

            </div>
        </>
    );
}

Screen.propTypes = {
    showModal: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,

};
