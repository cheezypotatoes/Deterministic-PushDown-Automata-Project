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
    
    const [test, setTest] = useState({ x:772.5, y: 138.5 }); // Test coordinates
    const [svgPosition, setSvgPosition] = useState([{ top: 0, left: 0 }]);
    const [svgDimensions, setSvgDimensions] = useState([{ width: 0, height: 0 }]);
    const [arrow, setArrow] = useState([])


    
    

    // UseEffect to calculate the center of the div
    useEffect(() => {
        // Function to calculate line coordinates
        const calculateLineCoordinates = (statePos) => {
            if (!selfDiv.current) return { x1: 0, y1: 0, x2: 0, y2: 0 };
    
            const rect = selfDiv.current.getBoundingClientRect(); // Get the div's bounding box
            const divCenterX = rect.left + rect.width / 2; // Calculate center X
            const divCenterY = rect.top + rect.height / 2; // Calculate center Y
    
            const targetX = statePos.x - svgPosition[0]?.left + 30; // Adjust for SVG offset
            const targetY = statePos.y - svgPosition[0]?.top + 30; // Adjust for SVG offset
    
            return {
                x1: divCenterX - svgPosition[0]?.left, // Adjust to SVG's local coordinates
                y1: divCenterY - svgPosition[0]?.top, // Adjust to SVG's local coordinates
                x2: targetX, // Adjust to SVG's local coordinates
                y2: targetY, // Adjust to SVG's local coordinates
            };
        };

    
        // Main logic
        const allSetTraverse = PushDownAutomataInstance.returnAllTrailState(stateName);
        if (allSetTraverse === null) return;
    
        console.log(allSetTraverse);
        const arrowArray = []
        for (const key in allSetTraverse) {
            const statePos = positionSet[allSetTraverse[key]];
    
            const minX = Math.min(position.x, statePos.x);
            const minY = Math.min(position.y, statePos.y);
            const maxX = Math.max(position.x, statePos.x);
            const maxY = Math.max(position.y, statePos.y);
    
            // Update SVG position and dimensions
            setSvgPosition((prevSvgPosition) => [
                ...prevSvgPosition,
                { top: minY, left: minX },
            ]);
            setSvgDimensions((prevSvgDimensions) => ({
                ...prevSvgDimensions,
                width: maxX - minX + 30,
                height: maxY - minY + 30,
            }));
    
            // Calculate line coordinates and update arrow state
            const { x1, y1, x2, y2 } = calculateLineCoordinates(statePos);
            arrowArray.push({ x1, y1, x2, y2 })
            setArrow(arrowArray);
        };
    }, [position, test, stateName, positionSet]); // Removed unnecessary and problematic dependencies
    

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
                top: svgPosition[0]?.top,
                left: svgPosition[0]?.left,
                pointerEvents: "none",
                zIndex: 1,
            }}
        >
            {arrow.map((line, index) => (
                <line
                    key={index}
                    id={`line-${index}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="white"
                    strokeWidth="1"
                    markerEnd="url(#arrowhead)"
                />
            ))}
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                    <polygon points="0,0 10,3 0,6" fill="white" />
                </marker>
            </defs>
        </svg>
                    

        <div ref={selfDiv} style={{ position: 'absolute', top: position.y, left: position.x }}>
        
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