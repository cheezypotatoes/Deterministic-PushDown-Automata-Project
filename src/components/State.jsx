import PropTypes from 'prop-types';
import StateImgHover from "../assets/images/StateImgHover.png";
import EditText from "../assets/images/EditTextPopUp.svg";
import { useRef } from 'react';



export default function StateWidget({ state, stateName, position}) {
    
    const configButton = useRef(null)
    const showConfig = useRef(false)

    const handleDragStart = (e) => {
        // Store the current mouse position when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: stateName}));
    };

    function ClickStateImg() {
        if (!showConfig.current) {
            configButton.current.style.display = 'block';
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
        console.log("Show")
    }

  
    return (
        
        <div style={{ position: 'absolute',  top: position.y, left: position.x, }} draggable="true">

            
            <img
                alt='Configuration Button'
                onClick={ShowConfigButton}
                ref={configButton}
                src={EditText}
                className="absolute display flex"
                style={{ marginTop: "-2vh", marginLeft: "-8vh", userSelect: 'none', cursor: "pointer", display: "none"}}/>
        
            <img  
                onMouseLeave={(e) => {e.target.src = state.src}}
                onMouseEnter={(e) => {e.target.src = StateImgHover; e.target.style.cursor = "grab"}}
                onClick={ClickStateImg} 
                onMouseDown={handleMouseDown}
                key={state.id} 
                src={state.src} 
                onDragStart={handleDragStart}
                className="w-stateSize h-stateSize" 
                alt="State Image"
            />
        </div>
        
        
    );
}

// Prop validation
StateWidget.propTypes = {
    state: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    }).isRequired,
    stateName: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
};