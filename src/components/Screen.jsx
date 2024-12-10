import stateImg from "../assets/images/StateImg.png";
import StateWidget from "./State";
import PropTypes from 'prop-types';
import InputPopUp from "./InputPopUp";
import ValidatorModal from "./InputValidator"
import {Node, PushDownAutomataInstance} from "../functions/PushDownAutomata"

import { useState, useEffect, useRef } from 'react';



export default function Screen({showModal, CloseModal, isModalOpen, isValidatorOpen, ShowValidator}) {

    const [statesOnScreen, SetStatesOnScreen] = useState([]);
    const [positions, setPositions] = useState({});
    const ScreenDrop = useRef(null);
    const stateCount = useRef(-1);
    const CurrentlySelecting = useRef(null);
    
    
    useEffect(() => {

        setPositions((prevPositions) => ({
            ...prevPositions,
            ["validatorModal"]: {x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200}, // Default location
        }));

        setPositions((prevPositions) => ({
            ...prevPositions,
            ["modal"]: {x: window.innerWidth / 2 + -500, y: window.innerHeight / 2 - 200}, // Default location
          }));

        const addState = (event) => {
            if (event.key == "p") {     

                stateCount.current += 1;
                const Name = `Q${stateCount.current}`

                // Create Node
                const StateNode = new Node(Name)
                PushDownAutomataInstance.addState(StateNode.stateName, StateNode)
                PushDownAutomataInstance.addStateCondition(StateNode.stateName, null, null, null)

                const NewState = {
                    id: Name,
                    src: stateImg,
                    // Get its push, pop, to traverse directly
                    push: PushDownAutomataInstance.returnPush(StateNode.stateName),
                    pop: PushDownAutomataInstance.returnPop(StateNode.stateName),
                    toTraverse: PushDownAutomataInstance.returnTraverseNode(StateNode.stateName),
                };
                SetStatesOnScreen((prevStates) => [...prevStates, NewState]);

                setPositions((prevPositions) => ({
                    ...prevPositions,
                    [Name]: {x: window.innerWidth / 2, y: window.innerHeight / 2}, // Default location
                  }));
            } else if (event.key == "o") { // Debugging
                PushDownAutomataInstance.printStateInfos()
            } else if (event.key == "i") {
                ShowValidator()
            }
        };
    
        // Listen for any key press
        window.addEventListener('keydown', addState);
    
        // Cleanup event listener when component unmounts
        return () => {
          window.removeEventListener('keydown', addState);
        };



      }, [statesOnScreen, ShowValidator]);

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

        const screenDimension = ScreenDrop.current.getBoundingClientRect();
        // If it's the modal
        if (name === "modal") {
           
            const screenWidth = screenDimension.width;
            const screenHeight = screenDimension.height;

            const modalWidth = (25 / 100) * window.innerWidth; // 25vw
            const modalHeight = (55 / 100) * window.innerHeight; // 55vh
    
            // Constrain the newX to not go past the left or right boundaries of the ScreenDrop div
            newX = Math.max(screenDimension.left, Math.min(newX, screenDimension.left + screenWidth - modalWidth));
    
            // Constrain the newY to not go past the top or bottom boundaries of the ScreenDrop div
            newY = Math.max(screenDimension.top, Math.min(newY, screenDimension.top + screenHeight - modalHeight));
        } else if (name === "validatorModal") {
            console.log(name)
            const screenWidth = screenDimension.width;
            const screenHeight = screenDimension.height;

            const modalWidth = (25 / 100) * window.innerWidth; // 25vw
            const modalHeight = (55 / 100) * window.innerHeight; // 55vh
    
            // Constrain the newX to not go past the left or right boundaries of the ScreenDrop div
            newX = Math.max(screenDimension.left, Math.min(newX, screenDimension.left + screenWidth - modalWidth));
    
            // Constrain the newY to not go past the top or bottom boundaries of the ScreenDrop div
            newY = Math.max(screenDimension.top, Math.min(newY, screenDimension.top + screenHeight - modalHeight));
        }
        
        else {
            // For non-modal elements, get the stateSize and calculate its size dynamically
            const pixelSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) || 1; // Default to 1 if not set
            const elementWidth = 16 * pixelSize;
            const elementHeight = 16 * pixelSize;
        
            // Constrain the newX to not go past the left or right boundaries of the ScreenDrop div
            newX = Math.max(screenDimension.left, Math.min(newX, screenDimension.right - elementWidth));
        
            // Constrain the newY to not go past the top or bottom boundaries of the ScreenDrop div
            newY = Math.max(screenDimension.top, Math.min(newY, screenDimension.bottom - elementHeight));
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
            onDrop={handleDrop}
            ref={ScreenDrop}>

                {statesOnScreen.map((state) => (
                    <StateWidget 
                    key={state.id} 
                    state={state} 
                    stateName={state.id} 
                    position={positions[state.id]}
                    showModal={showModal}
                    CloseModal={CloseModal}
                    isModalOpen={isModalOpen}
                    CurrentlySelecting={CurrentlySelecting}/>
                ))}

                <InputPopUp 
                position={positions["modal"]}
                CloseModal={CloseModal}
                isOpen={isModalOpen}
                setPositions={setPositions}
                CurrentlySelecting={CurrentlySelecting}/>

               <ValidatorModal 
               isValidatorOpen={isValidatorOpen}
               ValidatorModalPosition={positions["validatorModal"]} />
                
              

                

            </div>
        </>
    );
}

Screen.propTypes = {
    showModal: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    isValidatorOpen: PropTypes.bool.isRequired,
    ShowValidator: PropTypes.func.isRequired,

};
