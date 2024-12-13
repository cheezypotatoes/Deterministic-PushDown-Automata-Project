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
    const [svgPosition, setSvgPosition] = useState({ top: 0, left: 0 });
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
    

    // UseEffect to calculate the center of the div
    useEffect(() => {
        const minX = Math.min(position.x, test.x);
        const minY = Math.min(position.y, test.y);
        const maxX = Math.max(position.x, test.x);
        const maxY = Math.max(position.y, test.y);

        // Update SVG position and dimensions
        setSvgPosition({ top: minY, left: minX });
        setSvgDimensions({ width: maxX - minX + 30, height: maxY - minY + 30 }); // Adding padding
    }, [position, test]);


    const handleDragStart = (e) => {
        // Store the current mouse position when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: stateName}));
    };

    function ClickStateImg() { 
        console.log(position)

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

    const calculateLineCoordinates = () => {
        if (!selfDiv.current) return { x1: 0, y1: 0, x2: 0, y2: 0 };
        const rect = selfDiv.current.getBoundingClientRect(); // Get the div's bounding box
        const divCenterX = rect.left + rect.width / 2; // Calculate center X
        const divCenterY = rect.top + rect.height / 2; // Calculate center Y

        const targetX = (test.x - svgPosition.left) + 30
        const targetY = (test.y - svgPosition.top) + 30
    
        return {
            x1: divCenterX - svgPosition.left, // Adjust to SVG's local coordinates
            y1: divCenterY - svgPosition.top, // Adjust to SVG's local coordinates
            x2: targetX, // Adjust to SVG's local coordinates
            y2: targetY, // Adjust to SVG's local coordinates
        };
    };
    
    const { x1, y1, x2, y2 } = calculateLineCoordinates();

    
    return (
        <>
            <svg
                id="lineArrow"
                width={svgDimensions.width}
                height={svgDimensions.height}
                style={{
                    position: "absolute",
                    top: svgPosition.top,
                    left: svgPosition.left,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            >
                <line
                    id="line"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="1"
                    markerEnd="url(#arrowhead)"
                />
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