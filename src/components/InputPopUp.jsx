/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import ModalBackground from "../assets/images/ModalBackground.svg"
import {Node, PushDownAutomataInstance} from "../functions/PushDownAutomata"
import { useState, useEffect } from 'react';

export default function InputPopUp({ isOpen, onClose, position , CloseModal, CurrentlySelecting}) {
    if (!isOpen) return null;
    
    const [Name, setName] = useState("");
    const [push, setPush] = useState("");
    const [pop, setPop] = useState("");
    const [traverse, setStateTraverse] = useState("");

    // Update when modal is visible
    useEffect(() => {
        if (isOpen) {
            setName(CurrentlySelecting.current?.id || "");
            setPush(JSON.stringify(CurrentlySelecting.current?.push || {}));
            setPop(JSON.stringify(CurrentlySelecting.current?.pop || {}));
            setStateTraverse(JSON.stringify(CurrentlySelecting.current?.toTraverse || {}))
        }
    }, [isOpen, CurrentlySelecting]);


    const traverseChange = (e) => {
        setStateTraverse(e.target.value);
      };

    const pushChange = (e) => {
        setPush(e.target.value);
      };

    const popChange= (e) => {
        setPop(e.target.value);
      }; 

    const TurnIntoHash = (string) => {
        return string
        .replace(/(\w+):/g, '"$1":') // Add quotes around keys
        .replace(/:\s*(\w+)/g, ': "$1"') // Add quotes around values
        .replace(/"null"/g, 'null'); // Replace "null" with actual null
    }

    const EditPush = (push) => {
        const correctedPush = TurnIntoHash(push)
        
        try {
            const parsedPush = JSON.parse(correctedPush);  // Parse the fixed string
            // Check if parsedPush is an empty object
            if (Object.keys(parsedPush).length === 0) {
                console.log("CorrectedPush is an empty object. No changes made.");
                return;
            }

            // Proceed if not empty
            PushDownAutomataInstance.editPush(Name, parsedPush);
            setPush(JSON.stringify(PushDownAutomataInstance.returnPush(Name)));
            
            CurrentlySelecting.current.push = parsedPush // Update its data in frontend
        } catch (error) {
            console.log('Invalid JSON string');
        }
    }

    const EditPop = (pop) => {
        const correctedPop = TurnIntoHash(pop)
        
        try {
            const parsedPop = JSON.parse(correctedPop);  // Parse the fixed string
            // Check if parsedPush is an empty object
            if (Object.keys(parsedPop).length === 0) {
                console.log("CorrectedPush is an empty object. No changes made.");
                return;
            }

            // Proceed if not empty
            PushDownAutomataInstance.editPop(Name, parsedPop);
            setPop(JSON.stringify(PushDownAutomataInstance.returnPop(Name))); // Correctly update pop here
            CurrentlySelecting.current.pop = parsedPop; // Update its data in frontend
        } catch (error) {
            console.log('Invalid JSON string');
        }
    }

    const EditTraverse = (traverse) => {
        const correctedTraverse = TurnIntoHash(traverse)
        
        try {
            const parsedTraverse = JSON.parse(correctedTraverse);  // Parse the fixed string
            // Check if parsedPush is an empty object
            if (Object.keys(parsedTraverse).length === 0) {
                console.log("CorrectedPush is an empty object. No changes made.");
                return;
            }

            // Proceed if not empty
            PushDownAutomataInstance.editTraverse(Name, parsedTraverse);
            setStateTraverse(JSON.stringify(PushDownAutomataInstance.returnTraverseNode(Name))); // Correctly update pop here
            CurrentlySelecting.current.toTraverse = parsedTraverse; // Update its data in frontend
        } catch (error) {
            console.log('Invalid JSON string');
        }
    }
    
    function EditChanges() {
        EditPush(push)
        EditPop(pop)
        EditTraverse(traverse)
       
    }

    const handleDragStart = (e) => {
        // Store the current mouse position and state name when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: "modal" }));
    };

    const handleMouseDown = (e) => {
        e.target.style.cursor = "grabbing"
    }

    return (
        <div
            className="w-[25vw] h-[55vh] flex flex-col cursor-auto"
            style={{ position: 'absolute', top: position.y, left: position.x, userSelect: "none" }}>
            
             {/* Background image */}
             <img src={ModalBackground} className="absolute w-full h-full object-cover" alt="Background" />

            <div draggable
             onDragStart={handleDragStart}
             className="w-[23vw] h-[5vh] z-6 relative"
             onMouseEnter={(e) => { e.target.style.cursor = "grab"; }}
             onMouseDown={handleMouseDown}
             alt="DraggableHeader">
             </div>

             <h1
                className="font-pixelify text-center text-[1.5rem] font-extrabold text-[#BEDC7F] absolute top-0.4 right-2 z-10 cursor-pointer flex items-center justify-center w-[2rem] h-[2rem] mr-1"
                onClick={CloseModal}>X</h1>

            <div className='w-[25vw] h-[60vh] z-10'>

                <h1 className="font-pixelify text-3xl w-full text-center text-[#BEDC7F]">Configure State</h1>

                <form className="flex flex-col items-start p-4 space-y-3 z-10 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full">
                        <label 
                            htmlFor="StateName" 
                            className="w-40 text-1xl text-[#BEDC7F] font-pixelify sm:mb-0 mb-2">
                            State name:
                        </label>
                        <input
                            readOnly 
                            type="text"
                            name="StateName"
                            value={Name}
                            className="w-40 outline-none focus:outline-none border-none focus:ring-0 font-pixelify rounded p-2 flex-1 bg-[#112318] text-[#BEDC7F] text-center"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full">
                        <label 
                            htmlFor="Push" 
                            className="w-40 text-1xl text-[#BEDC7F] font-pixelify sm:mb-0 mb-2">
                            Push:
                        </label>
                        <input
                            onChange={(e) => {pushChange(e)}}
                            type="text"
                            name="Push"
                            value={push}
                            className="w-40 outline-none focus:outline-none border-none focus:ring-0 font-pixelify rounded p-2 flex-1 bg-[#112318] text-[#BEDC7F] text-center"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full">
                        <label 
                            htmlFor="Pop" 
                            className="w-40 text-1xl text-[#BEDC7F] font-pixelify sm:mb-0 mb-2">
                            Pop:
                        </label>
                        <input
                            onChange={(e) => {popChange(e)}}
                            type="text"
                            name="Pop"
                            value={pop}
                            className="w-40 outline-none focus:outline-none border-none focus:ring-0 font-pixelify rounded p-2 flex-1 bg-[#112318] text-[#BEDC7F] text-center"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full">
                        <label 
                            htmlFor="State Traverse" 
                            className="w-40 text-1xl text-[#BEDC7F] font-pixelify sm:mb-0 mb-2">
                            State Traverse:
                        </label>
                        <input
                            onChange={(e) => {traverseChange(e)}}
                            type="text"
                            name="State Traverse"
                            value={traverse}
                            className="w-40 outline-none focus:outline-none border-none focus:ring-0 font-pixelify rounded p-2 flex-1 bg-[#112318] text-[#BEDC7F] text-center"
                        />
                    </div>

                    <h1 className="font-pixelify text-1xl w-full text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318]"
                        onClick={EditChanges}>
                        Apply Changes
                    </h1>
                    
                </form>

            </div>

           
            
    
        </div>
    );
}    

InputPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    CloseModal:PropTypes.func,
    CurrentlySelecting: PropTypes.object,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
};