/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import StateImgHover from "../assets/images/StateImgHover.png";
import EditText from "../assets/images/EditTextPopUp.svg";
import { useRef, useState, useEffect } from 'react';
import {PushDownAutomataInstance} from "../functions/PushDownAutomata"



export default function StateWidget({ state, stateName, positionSet, position, showModal, CloseModal, isModalOpen, CurrentlySelecting}) {
    const configButton = useRef(null);
    const showConfig = useRef(false);
    const selfDiv = useRef(null);
    
    const [arrow, setArrow] = useState([])

    const calculateLineCoordinates = (statePos) => {
        if (!selfDiv.current) return { x1: 0, y1: 0, x2: 0, y2: 0 };

        const rect = selfDiv.current.getBoundingClientRect();
        const divCenterX = rect.left + rect.width / 2;
        const divCenterY = rect.top + rect.height / 2;

        // + 30 for accuracy
        const targetX = statePos.x  + 30;
        const targetY = statePos.y  + 30;

        return {
            x1: divCenterX, // Starting x
            y1: divCenterY, // Starting y
            x2: targetX, // target X
            y2: targetY, // Target y
        };
    };

    
    useEffect(() => {
        
        // Get all states it can traverse
        const allSetTraverse = PushDownAutomataInstance.returnAllTrailState(stateName);
        
        if (allSetTraverse === null) return;
    
        const arrowArray = []
        for (const key in allSetTraverse) {
            const statePos = positionSet[allSetTraverse[key]];
            console.log(statePos)
            if (statePos === undefined) {continue}
            const { x1, y1, x2, y2 } = calculateLineCoordinates(statePos);
            arrowArray.push({ x1, y1, x2, y2 })
            
        };
        setArrow(arrowArray);
    }, [position, stateName, positionSet]);
    

    const handleDragStart = (e) => {
        // Store the current mouse position when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: stateName}));
    };

    function ClickStateImg() { 
        console.log(arrow);

        // If there's already a modal
        if (!showConfig.current && !isModalOpen) {
            configButton.current.style.display = 'block';
            CurrentlySelecting.current = state;
            showConfig.current = true;
        } else {
            configButton.current.style.display = 'none';
            showConfig.current = false;
        }
        
    }

    const handleMouseDown = (e) => {
        e.target.style.cursor = "grabbing"
    }

    function ShowConfigButton() {
        showModal(true)
        configButton.current.style.display = 'none';
    }

    
    return (
        <>
         
        <svg
            id="lineArrow"
            width="100%"
            height="100%"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 1,
            }}>

            {/* Arrow lines */}
            {arrow.map((line, index) => (
                <line
                    key={index}
                    id={`line-${index}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#bedc7f"
                    strokeWidth="1"
                />
            ))}
        </svg>
                    

        <div ref={selfDiv} style={{ position: 'absolute', top: position.y, left: position.x, zIndex: 2 }}>
        
        {/* Configuration Button */}
        <img
            alt="Configuration Button"
            onClick={ShowConfigButton}
            ref={configButton}
            src={EditText}
            className="absolute display flex"
            style={{
                marginTop: "-2vh", 
                marginLeft: "-8vh", 
                userSelect: 'none', 
                cursor: "pointer", 
                display: "none"
            }} 
        />

       
        {/* State Image */}
        <img
            onMouseLeave={(e) => { e.target.src = state.src }}
            onMouseEnter={(e) => { e.target.src = StateImgHover; e.target.style.cursor = "grab" }}
            onClick={ClickStateImg}
            onMouseDown={handleMouseDown}
            key={state.id}
            src={state.src}
            onDragStart={handleDragStart}
            className="w-stateSize h-stateSize"
            alt="State Image"
        />
    </div>

    </>
    );
}


StateWidget.propTypes = {
    state: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    }).isRequired,
    stateName: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
    CurrentlySelecting: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    positionSet: PropTypes.object.isRequired,

};