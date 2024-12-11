/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { useState } from 'react';
import {PushDownAutomataInstance} from "../functions/PushDownAutomata"

export default function ValidatorModal({ isValidatorOpen ,ValidatorModalPosition}) {
    if (!isValidatorOpen) return null;
    
    const [input, setInput] = useState("");
    const [result, setResult] = useState("")
    

    const handleDragStart = (e) => {
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: "validatorModal" }));
    };

    const handleMouseDown = (e) => {
        e.target.style.cursor = "grabbing"
    }

    function validateInput() {
        const result = PushDownAutomataInstance.validateInput(input)
        if (result) {
            setResult("Accepted")
            return
        }
        setResult("Rejected")
    }

    return (
        <div
            className="w-[25vw]  flex flex-col cursor-auto"
            style={{ position: 'absolute', top: ValidatorModalPosition.y, left: ValidatorModalPosition.x, userSelect: "none" }}>
            
        
            <div draggable
             onDragStart={handleDragStart}
             className="w-[25vw] h-[5vh] z-6 relative bg-[#1e3a29] z-10"
             onMouseEnter={(e) => { e.target.style.cursor = "grab"; }}
             onMouseDown={handleMouseDown}
             alt="DraggableHeader">
             </div>


             <div className='z-10 bg-[#4d8061] pt-2 pb-2'>
                <h1 className="font-pixelify text-3xl w-full text-center text-[#BEDC7F]">{`Input: ${result}`}</h1>
                <form className="flex flex-col items-start p-4 space-y-3 z-10 w-full">
                        <input
                            type="text"
                            name="Input"
                            onChange={(e) => {setInput(e.target.value); if (e.target.value.length == 0) {setResult("")}}}
                            value={input}
                            className="w-[23vw] outline-none focus:outline-none border-none focus:ring-0 font-pixelify rounded p-2 flex-1 bg-[#112318] text-[#BEDC7F] text-center"
                        />
                    
                </form>
                <h1
                 onClick={validateInput}
                 className="w-[15vw] font-pixelify text-1xl text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318] mx-auto flex items-center justify-center">
                    Apply Changes
                </h1>

                
            </div>


            
        </div>
    );
}    

ValidatorModal.propTypes = {
    
    ValidatorModalPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    isValidatorOpen: PropTypes.bool.isRequired
};
